import { useEffect, useRef, useState, type ReactNode } from "react";
import { RotateCw, Search, X } from "lucide-react";

import StudyCard from "./StudyCard";
import CatalogPagination from "./CatalogPagination";
import StudyTypeFilterControl from "../filter/StudyTypeFilterControl";
import { getAllStudies } from "../../../api/studiesApi/studiesApi";
import type { Study } from "../../../interfaces/study.interface";
import type { ServiceDetail } from "../../../interfaces/service.interface";
import { getOneResource } from "../../../utils/getOneResource";
import { studyTypeToIsPanel, type StudyTypeFilter } from "../../../utils/studyTypeFilter";
import {
  buildCatalogHref,
  CATALOG_ANCHOR,
  PAGE_QUERY_KEY,
  type CatalogQuery,
} from "../../../utils/catalogQuery";
import { Buttonstyles } from "../../../styles/buttonsStyles";

const SEARCH_DEBOUNCE_MS = 350;

/** Where the rows come from: the whole branch catalog or one service. */
export type CatalogSource = { type: "all" } | { type: "service"; slug: string };

interface StudyCatalogProps {
  source: CatalogSource;
  branchId?: string;
  /** Page path used to build shareable URLs, e.g. "/estudios". */
  basePath: string;
  pageSize: number;
  initialQuery: CatalogQuery;
  /** Server-rendered first page. Omit it to fetch on mount (client-only use). */
  initialStudies?: Study[];
  initialTotal?: number;
  initialTotalPages?: number;
  /** Optional label for the scope in the result count, e.g. "en Análisis clínicos". */
  scopeLabel?: string;
  /** Mirror search, filter and page in the URL (off inside the quoter). */
  syncUrl?: boolean;
  /** Replaces each row's default "add to selected studies" button. */
  renderAction?: (study: Study) => ReactNode;
}

type Status = "idle" | "loading" | "error";

const fetchCatalog = async (
  source: CatalogSource,
  branchId: string | undefined,
  pageSize: number,
  { search, page, studyType }: CatalogQuery,
) => {
  const isPanel = studyTypeToIsPanel(studyType);
  if (source.type === "all") {
    const response = await getAllStudies({
      page,
      limit: pageSize,
      search: search || undefined,
      isPanel,
      branchId,
    });
    return { data: response.data, total: response.total, totalPages: response.totalPages };
  }
  const detail = await getOneResource<ServiceDetail>("services", source.slug, {
    branchId,
    page,
    limit: pageSize,
    search,
    isPanel,
  });
  if (!detail) throw new Error("Servicio no disponible");
  return {
    data: detail.studies?.data ?? [],
    total: detail.studies?.total ?? 0,
    totalPages: detail.studies?.totalPages ?? 1,
  };
};

const emptyMessage = (studyType: StudyTypeFilter, scopeLabel?: string) => {
  const scope = scopeLabel ? ` ${scopeLabel}` : " en tu sucursal";
  if (studyType === "profiles") return `No hay perfiles disponibles${scope}.`;
  if (studyType === "studies") return `No hay estudios individuales disponibles${scope}.`;
  return `Aún no hay estudios disponibles${scope}.`;
};

/**
 * Searchable, filterable, paginated study list. The server renders the
 * first view from the URL; later changes fetch on the client and keep the
 * URL in sync (search/filter replace the entry, page changes push one).
 */
const StudyCatalog = ({
  source,
  branchId,
  basePath,
  pageSize,
  initialQuery,
  initialStudies,
  initialTotal = 0,
  initialTotalPages = 1,
  scopeLabel,
  syncUrl = true,
  renderAction,
}: StudyCatalogProps) => {
  const hasInitialData = initialStudies !== undefined;
  const [query, setQuery] = useState<CatalogQuery>(initialQuery);
  const [searchInput, setSearchInput] = useState(initialQuery.search);
  const [studies, setStudies] = useState<Study[]>(initialStudies ?? []);
  const [total, setTotal] = useState(initialTotal);
  const [totalPages, setTotalPages] = useState(initialTotalPages);
  const [status, setStatus] = useState<Status>(hasInitialData ? "idle" : "loading");
  const [reloadKey, setReloadKey] = useState(0);
  const listTopRef = useRef<HTMLDivElement>(null);
  const isFirstRun = useRef(true);

  // Debounced search → page 1.
  useEffect(() => {
    const term = searchInput.trim();
    if (term === query.search) return;
    const timeout = setTimeout(() => {
      setQuery((current) => ({ ...current, search: term, page: 1 }));
    }, SEARCH_DEBOUNCE_MS);
    return () => clearTimeout(timeout);
  }, [searchInput, query.search]);

  useEffect(() => {
    if (isFirstRun.current) {
      isFirstRun.current = false;
      if (hasInitialData) return;
    }
    let cancelled = false;
    setStatus("loading");
    fetchCatalog(source, branchId, pageSize, query)
      .then((result) => {
        if (cancelled) return;
        setStudies(result.data);
        setTotal(result.total);
        setTotalPages(Math.max(result.totalPages, 1));
        setStatus("idle");
      })
      .catch(() => {
        if (!cancelled) setStatus("error");
      });
    return () => {
      cancelled = true;
    };
    // source/branchId/pageSize are fixed for the island's lifetime.
  }, [query, reloadKey]);

  const updateUrl = (next: CatalogQuery, push: boolean) => {
    if (!syncUrl) return;
    const href = buildCatalogHref(basePath, next, false);
    const state = window.history.state;
    if (push) window.history.pushState(state, "", href);
    else window.history.replaceState(state, "", href);
  };

  useEffect(() => {
    if (!isFirstRun.current) updateUrl(query, false);
  }, [query.search, query.studyType]);

  // Back/forward between pages restores that page.
  useEffect(() => {
    if (!syncUrl) return;
    const onPopState = () => {
      const params = new URLSearchParams(window.location.search);
      const page = Number.parseInt(params.get(PAGE_QUERY_KEY) ?? "1", 10) || 1;
      setQuery((current) => (current.page === page ? current : { ...current, page }));
    };
    window.addEventListener("popstate", onPopState);
    return () => window.removeEventListener("popstate", onPopState);
  }, [syncUrl]);

  const goToPage = (page: number) => {
    const next = { ...query, page };
    setQuery(next);
    updateUrl(next, true);
    listTopRef.current?.scrollIntoView({ block: "start" });
  };

  const changeType = (studyType: StudyTypeFilter) =>
    setQuery((current) => ({ ...current, studyType, page: 1 }));

  const clearSearch = () => {
    setSearchInput("");
    setQuery((current) => ({ ...current, search: "", page: 1 }));
  };

  const isLoading = status === "loading";
  const noun = query.studyType === "profiles" ? ["perfil", "perfiles"] : ["estudio", "estudios"];
  const countLabel = `${total.toLocaleString("es-MX")} ${total === 1 ? noun[0] : noun[1]}`;

  return (
    <div id={CATALOG_ANCHOR} className="scroll-mt-24">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <form
          role="search"
          className="relative w-full sm:max-w-sm"
          onSubmit={(event) => {
            event.preventDefault();
            setQuery((current) => ({ ...current, search: searchInput.trim(), page: 1 }));
          }}
        >
          <label htmlFor="catalog-search" className="sr-only">
            Buscar por nombre, abreviatura o código
          </label>
          <Search
            aria-hidden="true"
            className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-ink-subtle"
          />
          <input
            id="catalog-search"
            type="search"
            name="q"
            value={searchInput}
            onChange={(event) => setSearchInput(event.target.value)}
            placeholder="Nombre, abreviatura o código"
            autoComplete="off"
            enterKeyHint="search"
            className="h-11 w-full rounded-clinical-sm border border-ui-border bg-white pl-9 pr-10 text-sm text-ink placeholder:text-ink-subtle transition-colors duration-200 hover:border-brand-ink/30 focus:border-brand-ink focus:outline-none focus:ring-2 focus:ring-green-primary/30 [&::-webkit-search-cancel-button]:hidden"
          />
          {searchInput && (
            <button
              type="button"
              onClick={clearSearch}
              aria-label="Limpiar búsqueda"
              className="absolute right-2 top-1/2 flex h-8 w-8 -translate-y-1/2 items-center justify-center rounded-full text-ink-subtle transition-colors hover:bg-ui-bg hover:text-ink focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-green-primary"
            >
              <X aria-hidden="true" className="h-4 w-4" />
            </button>
          )}
        </form>

        <StudyTypeFilterControl value={query.studyType} onChange={changeType} />
      </div>

      <div ref={listTopRef} className="scroll-mt-24" />

      <p aria-live="polite" className="mt-6 text-sm text-ink-muted">
        {isLoading ? (
          "Buscando…"
        ) : status === "error" ? null : query.search ? (
          <>
            <span className="font-semibold text-ink tabular-nums">{countLabel}</span> para “
            {query.search}”{scopeLabel ? ` ${scopeLabel}` : ""}
          </>
        ) : (
          <>
            <span className="font-semibold text-ink tabular-nums">{countLabel}</span>
            {scopeLabel ? ` ${scopeLabel}` : ""}
          </>
        )}
      </p>

      <div className="@container mt-3" aria-busy={isLoading}>
        {status === "error" ? (
          <div className="rounded-clinical-md border border-ui-border bg-white px-6 py-10 text-center">
            <p className="font-semibold text-ink">No pudimos cargar los estudios.</p>
            <p className="mt-1 text-sm text-ink-muted">
              Revisa tu conexión e inténtalo de nuevo.
            </p>
            <button
              type="button"
              onClick={() => setReloadKey((key) => key + 1)}
              className={`${Buttonstyles({ variant: "outline", size: "sm" })} mt-4`}
            >
              <RotateCw aria-hidden="true" className="h-4 w-4" />
              Reintentar
            </button>
          </div>
        ) : studies.length > 0 ? (
          <ul
            className={`grid gap-4 @xl:grid-cols-2 @4xl:grid-cols-3 @7xl:grid-cols-4 transition-opacity duration-150 ${
              isLoading ? "opacity-60" : ""
            }`}
          >
            {studies.map((study) => (
              <StudyCard key={study.id} study={study} action={renderAction?.(study)} />
            ))}
          </ul>
        ) : isLoading ? (
          <ul className="grid gap-4 @xl:grid-cols-2 @4xl:grid-cols-3 @7xl:grid-cols-4">
            {[0, 1, 2].map((index) => (
              <li
                key={index}
                className="space-y-3 overflow-hidden rounded-clinical-md border border-ui-border bg-white p-5"
              >
                <div className="h-5 w-20 rounded-clinical-sm bg-ui-bg motion-safe:animate-pulse" />
                <div className="h-5 w-3/4 rounded-clinical-sm bg-ui-bg motion-safe:animate-pulse" />
                <div className="h-4 w-1/2 rounded-clinical-sm bg-ui-bg motion-safe:animate-pulse" />
                <div className="h-4 w-2/3 rounded-clinical-sm bg-ui-bg motion-safe:animate-pulse" />
                <div className="h-8 w-1/3 rounded-clinical-sm bg-ui-bg motion-safe:animate-pulse" />
                <div className="h-9 w-full rounded-clinical-sm bg-ui-bg motion-safe:animate-pulse" />
              </li>
            ))}
          </ul>
        ) : (
          <div className="rounded-clinical-md border border-dashed border-ui-border bg-white px-6 py-12 text-center">
            {query.search ? (
              <>
                <p className="font-semibold text-ink">
                  Sin resultados para “{query.search}”
                </p>
                <p className="mx-auto mt-1 max-w-md text-sm text-ink-muted">
                  Revisa la ortografía o busca por la abreviatura (por ejemplo,
                  BH) o el código del estudio.
                </p>
                <button
                  type="button"
                  onClick={clearSearch}
                  className={`${Buttonstyles({ variant: "outline", size: "sm" })} mt-4`}
                >
                  Ver todos los estudios
                </button>
              </>
            ) : (
              <p className="text-ink-muted">{emptyMessage(query.studyType, scopeLabel)}</p>
            )}
          </div>
        )}
      </div>

      {status !== "error" && (
        <div className="mt-6">
          <CatalogPagination
            currentPage={query.page}
            totalPages={totalPages}
            getHref={(page) =>
              syncUrl ? buildCatalogHref(basePath, { ...query, page }) : `#${CATALOG_ANCHOR}`
            }
            onNavigate={goToPage}
          />
        </div>
      )}
    </div>
  );
};

export default StudyCatalog;
