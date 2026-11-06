import { useEffect, useMemo, useState } from "react";
import { AlertTriangle, MapPin } from "lucide-react";
import { useStore } from "@nanostores/react";
import clsx from "clsx";

import StudyCatalog from "../../../components/react/study/StudyCatalog";
import SelectToggleButton from "../../../components/react/study/SelectToggleButton";
import { Buttonstyles } from "../../../styles/buttonsStyles";
import type { Study } from "../../../interfaces/study.interface";
import type { Service, ServiceDetail } from "../../../interfaces/service.interface";
import { getOneResource } from "../../../utils/getOneResource";
import { getAllService } from "../../../api/servicesApi/serviceApi";
import { getStoredBranchId, openBranchSelectorModal } from "../../../stores/branchStore";
import {
  addStudyToQuote,
  removeStudy,
  selectedStudiesStore,
  selectedServiceStore,
  clearStudies,
} from "../../../stores/quoterStore";
import type { QuoterService } from "../../../utils/quoterStudies";

const PAGE_SIZE = 10;

type ServiceMeta = QuoterService | "no-price-sheet" | null;

/**
 * Step 1: pick a service, then add its priced studies. A quote holds one
 * service (one price sheet); switching service with studies already added
 * asks first instead of silently dropping them.
 */
const QuoterSelectStudies = () => {
  const [branchId] = useState<string | null>(() => getStoredBranchId());
  const [services, setServices] = useState<Service[] | null>(null);
  const [activeSlug, setActiveSlug] = useState<string | null>(null);
  const [pendingSlug, setPendingSlug] = useState<string | null>(null);
  const [serviceMeta, setServiceMeta] = useState<ServiceMeta>(null);

  const selectedStudies = useStore(selectedStudiesStore);
  const quoteService = useStore(selectedServiceStore);

  useEffect(() => {
    if (!branchId) return;
    getAllService(branchId)
      .then((list) => setServices(list.filter((s) => (s._count?.studies ?? 0) > 0)))
      .catch(() => setServices([]));
  }, [branchId]);

  // Open the quote's service if it has one, else the first quotable service.
  useEffect(() => {
    if (activeSlug || !services?.length) return;
    const fromQuote = services.find((s) => s.slug === quoteService?.slug);
    setActiveSlug((fromQuote ?? services[0]).slug);
  }, [services, quoteService, activeSlug]);

  // Price sheet of the service on screen (needed to pin the quote to it).
  useEffect(() => {
    if (!activeSlug || !branchId) return;
    let cancelled = false;
    setServiceMeta(null);
    getOneResource<ServiceDetail>("services", activeSlug, { branchId, limit: 1 }).then(
      (detail) => {
        if (cancelled) return;
        setServiceMeta(
          detail?.id && detail.priceSheetId
            ? {
                id: detail.id,
                slug: detail.slug,
                name: detail.name,
                priceSheetId: detail.priceSheetId,
              }
            : "no-price-sheet",
        );
      },
    );
    return () => {
      cancelled = true;
    };
  }, [activeSlug, branchId]);

  const activeService = useMemo(
    () => services?.find((s) => s.slug === activeSlug) ?? null,
    [services, activeSlug],
  );

  const requestService = (slug: string) => {
    if (slug === activeSlug) return;
    const hasOtherServiceStudies =
      selectedStudies.length > 0 && quoteService && quoteService.slug !== slug;
    if (hasOtherServiceStudies) setPendingSlug(slug);
    else setActiveSlug(slug);
  };

  const confirmSwitch = () => {
    clearStudies();
    setActiveSlug(pendingSlug);
    setPendingSlug(null);
  };

  if (!branchId) {
    return (
      <div className="flex flex-col items-center px-6 py-14 text-center">
        <MapPin aria-hidden="true" className="h-8 w-8 text-brand-ink" strokeWidth={1.5} />
        <h2 className="mt-4 text-lg font-bold text-ink">Elige tu sucursal para cotizar</h2>
        <p className="mt-2 max-w-sm text-sm leading-relaxed text-ink-muted">
          Los precios cambian según la sucursal. Elige la tuya para ver la lista
          de precios y armar tu cotización.
        </p>
        <button
          type="button"
          onClick={() => openBranchSelectorModal()}
          className={`${Buttonstyles({ variant: "primary", size: "lg" })} mt-6`}
        >
          <MapPin aria-hidden="true" className="h-4 w-4" />
          Elegir sucursal
        </button>
      </div>
    );
  }

  if (services === null) {
    return <p className="py-10 text-center text-sm text-ink-muted">Cargando servicios…</p>;
  }

  if (services.length === 0) {
    return (
      <p className="py-10 text-center text-sm text-ink-muted">
        Esta sucursal aún no tiene estudios con precio para cotizar en línea.
        Consulta en sucursal.
      </p>
    );
  }

  const pendingService = services.find((s) => s.slug === pendingSlug);
  const quoteMeta = serviceMeta && serviceMeta !== "no-price-sheet" ? serviceMeta : null;
  const isQuotable = quoteMeta !== null;

  const renderAction = (study: Study) => {
    const isSelected = selectedStudies.some((s) => s.id === study.id);
    const hasPrice = study.priceInfo?.showPrice === true;
    return (
      <SelectToggleButton
        isSelected={isSelected}
        disabled={!isQuotable || (!hasPrice && !isSelected)}
        studyName={study.name}
        target="la cotización"
        onToggle={() => {
          if (isSelected) removeStudy(study.id);
          else if (quoteMeta) addStudyToQuote(study, quoteMeta);
        }}
      />
    );
  };

  return (
    <div className="space-y-6">
      {services.length > 1 && (
        <fieldset>
          <legend className="text-sm font-semibold text-ink">Servicio</legend>
          <div className="mt-2 flex flex-wrap gap-2">
            {services.map((service) => {
              const isActive = service.slug === activeSlug;
              return (
                <button
                  key={service.slug}
                  type="button"
                  aria-pressed={isActive}
                  onClick={() => requestService(service.slug)}
                  className={clsx(
                    "inline-flex h-10 items-center rounded-full border px-4 text-sm font-semibold transition-colors duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-green-primary",
                    isActive
                      ? "border-brand-ink bg-brand-ink text-white"
                      : "border-ui-border bg-white text-ink hover:border-brand-ink/30 hover:text-brand-ink",
                  )}
                >
                  {service.name}
                </button>
              );
            })}
          </div>
        </fieldset>
      )}

      {pendingService && (
        <div
          role="alertdialog"
          aria-labelledby="switch-title"
          aria-describedby="switch-desc"
          className="rounded-clinical-md border border-yellow-secondary/40 bg-yellow-primary/10 p-4"
        >
          <p id="switch-title" className="flex items-center gap-2 font-semibold text-ink">
            <AlertTriangle aria-hidden="true" className="h-4 w-4 text-yellow-ink" />
            ¿Cambiar a {pendingService.name}?
          </p>
          <p id="switch-desc" className="mt-1 text-sm text-ink-muted">
            Cada servicio tiene su propia lista de precios, así que una cotización
            solo puede incluir estudios de un servicio. Se quitarán los{" "}
            {selectedStudies.length} estudios de {quoteService?.name}.
          </p>
          <div className="mt-3 flex flex-wrap gap-2">
            <button
              type="button"
              onClick={confirmSwitch}
              className={Buttonstyles({ variant: "primary", size: "sm" })}
            >
              Cambiar y quitar estudios
            </button>
            <button
              type="button"
              onClick={() => setPendingSlug(null)}
              className={Buttonstyles({ variant: "outline", size: "sm" })}
            >
              Mantener {quoteService?.name}
            </button>
          </div>
        </div>
      )}

      {serviceMeta === "no-price-sheet" && (
        <p className="rounded-clinical-md border border-ui-border bg-ui-bg p-4 text-sm text-ink-muted">
          {activeService?.name} aún no tiene lista de precios en tu sucursal.
          Elige otro servicio o consulta en sucursal.
        </p>
      )}

      {activeSlug && (
        <StudyCatalog
          key={activeSlug}
          source={{ type: "service", slug: activeSlug }}
          branchId={branchId}
          basePath="/quoter"
          pageSize={PAGE_SIZE}
          initialQuery={{ search: "", page: 1, studyType: "all" }}
          scopeLabel={activeService ? `en ${activeService.name}` : undefined}
          syncUrl={false}
          renderAction={renderAction}
        />
      )}
    </div>
  );
};

export default QuoterSelectStudies;
