import { useEffect, useId, useRef, useState } from "react";
import clsx from "clsx";
import { Loader2, Search, X } from "lucide-react";

import { getAllStudies } from "../../../api/studiesApi/studiesApi";
import type { Study } from "../../../interfaces/study.interface";
import { getCatalogName } from "../../../interfaces/study.interface";
import { formatMXN } from "../../../utils/currency";
import { buildCatalogHref } from "../../../utils/catalogQuery";

const MIN_CHARS = 2; // same as the backend's minSearchLength
const DEBOUNCE_MS = 250;
const RESULT_LIMIT = 6;

type Status = "idle" | "loading" | "done" | "error";

interface StudySearchProps {
  /**
   * "inline": always-visible field (wide screens).
   * "toggle": icon button that opens a full-width search bar under the header.
   */
  variant?: "inline" | "toggle";
  /** "lg" for the home hero, "md" in the header. */
  size?: "md" | "lg";
  /** Accessible name / placeholder override. */
  placeholder?: string;
}

/**
 * Header search over the active branch's studies (GET /studies, name, title,
 * code and abbreviation). ARIA 1.2 combobox: arrows move, Enter opens the
 * study, Escape closes.
 */
const StudySearch = ({
  variant = "inline",
  size = "md",
  placeholder = "Buscar estudio o código",
}: StudySearchProps) => {
  const id = useId();
  const listboxId = `${id}-listbox`;
  const inputRef = useRef<HTMLInputElement>(null);
  const rootRef = useRef<HTMLDivElement>(null);
  const requestRef = useRef(0);

  const [isPanelOpen, setIsPanelOpen] = useState(variant === "inline");
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<Study[]>([]);
  const [status, setStatus] = useState<Status>("idle");
  const [activeIndex, setActiveIndex] = useState(-1);
  const [isListOpen, setIsListOpen] = useState(false);

  const term = query.trim();
  const canSearch = term.length >= MIN_CHARS;
  const allResultsHref = buildCatalogHref("/estudios", {
    search: term,
    page: 1,
    studyType: "all",
  }, false);

  useEffect(() => {
    if (!canSearch) {
      setResults([]);
      setStatus("idle");
      return;
    }
    const requestId = ++requestRef.current;
    setStatus("loading");
    const timeout = setTimeout(() => {
      getAllStudies({ search: term, limit: RESULT_LIMIT })
        .then((response) => {
          if (requestId !== requestRef.current) return;
          setResults(response.data);
          setActiveIndex(-1);
          setStatus("done");
        })
        .catch(() => {
          if (requestId === requestRef.current) setStatus("error");
        });
    }, DEBOUNCE_MS);
    return () => clearTimeout(timeout);
  }, [term, canSearch]);

  // Close the results when focus or clicks leave the component.
  useEffect(() => {
    const onPointerDown = (event: PointerEvent) => {
      if (!rootRef.current?.contains(event.target as Node)) {
        setIsListOpen(false);
        if (variant === "toggle" && !query) setIsPanelOpen(false);
      }
    };
    document.addEventListener("pointerdown", onPointerDown);
    return () => document.removeEventListener("pointerdown", onPointerDown);
  }, [variant, query]);

  useEffect(() => {
    if (isPanelOpen && variant === "toggle") inputRef.current?.focus();
  }, [isPanelOpen, variant]);

  const goTo = (study: Study) => {
    window.location.href = `/study/${study.slug}`;
  };

  const close = () => {
    setIsListOpen(false);
    setActiveIndex(-1);
    if (variant === "toggle") setIsPanelOpen(false);
  };

  const onKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "ArrowDown" && results.length) {
      event.preventDefault();
      setIsListOpen(true);
      setActiveIndex((index) => (index + 1) % results.length);
    } else if (event.key === "ArrowUp" && results.length) {
      event.preventDefault();
      setActiveIndex((index) => (index <= 0 ? results.length - 1 : index - 1));
    } else if (event.key === "Enter") {
      // A highlighted option opens that study; otherwise show all results.
      const study = results[activeIndex];
      if (study) {
        event.preventDefault();
        goTo(study);
      } else if (canSearch) {
        event.preventDefault();
        window.location.href = allResultsHref;
      }
    } else if (event.key === "Escape") {
      if (query) setQuery("");
      else close();
    }
  };

  const showList = isListOpen && canSearch;

  const field = (
    <div className="relative w-full">
      <Search
        aria-hidden="true"
        className={clsx(
          "pointer-events-none absolute top-1/2 -translate-y-1/2 text-ink-subtle",
          size === "lg" ? "left-4 h-5 w-5" : "left-3 h-4 w-4",
        )}
      />
      <input
        ref={inputRef}
        type="search"
        role="combobox"
        aria-expanded={showList}
        aria-controls={listboxId}
        aria-autocomplete="list"
        aria-activedescendant={
          activeIndex >= 0 ? `${id}-option-${activeIndex}` : undefined
        }
        aria-label="Buscar estudio por nombre o código"
        placeholder={placeholder}
        autoComplete="off"
        enterKeyHint="search"
        value={query}
        onChange={(event) => {
          setQuery(event.target.value);
          setIsListOpen(true);
        }}
        onFocus={() => setIsListOpen(true)}
        onKeyDown={onKeyDown}
        className={clsx(
          "w-full rounded-clinical-sm border border-ui-border pl-9 pr-9 text-ink placeholder:text-ink-subtle transition-colors duration-200 hover:border-brand-ink/30 focus:border-brand-ink focus:bg-white focus:outline-none focus:ring-2 focus:ring-green-primary/30 [&::-webkit-search-cancel-button]:hidden",
          size === "lg" ? "h-14 bg-white pl-11 text-base shadow-xs" : "h-10 bg-ui-bg text-sm",
        )}
      />
      {status === "loading" ? (
        <Loader2
          aria-hidden="true"
          className="absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-ink-subtle motion-safe:animate-spin"
        />
      ) : (
        query && (
          <button
            type="button"
            onClick={() => {
              setQuery("");
              inputRef.current?.focus();
            }}
            aria-label="Limpiar búsqueda"
            className="absolute right-2 top-1/2 flex h-7 w-7 -translate-y-1/2 items-center justify-center rounded-full text-ink-subtle transition-colors hover:bg-ui-border hover:text-ink focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-green-primary"
          >
            <X aria-hidden="true" className="h-4 w-4" />
          </button>
        )
      )}

      <div
        className={clsx(
          "absolute inset-x-0 top-full z-50 mt-2 overflow-hidden rounded-clinical-md border border-ui-border bg-white shadow-md",
          !showList && "hidden",
        )}
      >
        <ul id={listboxId} role="listbox" aria-label="Estudios encontrados">
          {results.map((study, index) => {
            const sampleType = getCatalogName(study.sampleType);
            return (
              <li
                key={study.id}
                id={`${id}-option-${index}`}
                role="option"
                aria-selected={index === activeIndex}
                onPointerDown={(event) => event.preventDefault()}
                onClick={() => goTo(study)}
                onMouseEnter={() => setActiveIndex(index)}
                className={clsx(
                  "flex cursor-pointer items-center justify-between gap-3 border-b border-ui-border px-4 py-3 last:border-b-0",
                  index === activeIndex && "bg-green-primary/8",
                )}
              >
                <span className="min-w-0">
                  <span className="block truncate text-sm font-semibold text-ink">
                    {study.name}
                  </span>
                  <span className="mt-0.5 flex items-center gap-2 text-xs text-ink-subtle">
                    <span className="font-mono text-ink-muted">{study.code}</span>
                    {sampleType && <span className="truncate">· {sampleType}</span>}
                  </span>
                </span>
                {study.priceInfo?.showPrice && (
                  <span className="shrink-0 text-sm font-semibold tabular-nums text-ink">
                    {formatMXN(study.priceInfo.price)}
                  </span>
                )}
              </li>
            );
          })}
        </ul>

        {status === "done" && results.length > 0 && (
          <a
            href={allResultsHref}
            onPointerDown={(event) => event.preventDefault()}
            className="block border-t border-ui-border bg-ui-bg px-4 py-2.5 text-sm font-semibold text-brand-ink transition-colors hover:bg-green-primary/8 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-green-primary"
          >
            Ver todos los resultados para “{term}”
          </a>
        )}
        {status === "done" && results.length === 0 && (
          <p className="px-4 py-4 text-sm text-ink-muted">
            Sin resultados para “{term}”. Prueba con otro nombre, la abreviatura
            o el código del estudio.
          </p>
        )}
        {status === "error" && (
          <p className="px-4 py-4 text-sm text-ink-muted">
            No pudimos buscar en este momento. Intenta de nuevo en unos segundos.
          </p>
        )}
        {status === "loading" && results.length === 0 && (
          <p className="px-4 py-4 text-sm text-ink-subtle">Buscando…</p>
        )}
      </div>

      <span className="sr-only" aria-live="polite">
        {status === "done"
          ? results.length
            ? `${results.length} estudios encontrados`
            : "Sin resultados"
          : ""}
      </span>
    </div>
  );

  if (variant === "inline") {
    return (
      <div ref={rootRef} className="w-full">
        {field}
      </div>
    );
  }

  return (
    <div ref={rootRef}>
      <button
        type="button"
        onClick={() => (isPanelOpen ? close() : setIsPanelOpen(true))}
        aria-label={isPanelOpen ? "Cerrar búsqueda" : "Buscar estudio"}
        aria-expanded={isPanelOpen}
        className="flex h-10 w-10 items-center justify-center rounded-clinical-sm text-ink transition-colors duration-200 hover:bg-green-primary/8 hover:text-brand-ink focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-green-primary"
      >
        {isPanelOpen ? (
          <X aria-hidden="true" className="h-5 w-5" />
        ) : (
          <Search aria-hidden="true" className="h-5 w-5" />
        )}
      </button>
      {isPanelOpen && (
        <div className="absolute inset-x-0 top-full border-b border-ui-border bg-white px-4 py-3 shadow-sm sm:px-6">
          <div className="mx-auto max-w-2xl">{field}</div>
        </div>
      )}
    </div>
  );
};

export default StudySearch;
