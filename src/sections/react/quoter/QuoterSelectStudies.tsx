import { useEffect, useMemo, useState } from "react";
import { MapPin, Search, X } from "lucide-react";
import { useStore } from "@nanostores/react";

import Button from "../../../components/react/buttons/Button";
import CardQuoteStudy from "../../../components/react/cards/CardQuoteStudy";
import SelectInput from "../../../components/react/form/SelectInput";
import Pagination from "../../../components/react/ui/Pagination";
import usePagination from "../../../hooks/usePagination";

import type { Study } from "../../../interfaces/study.interface";
import type { Service } from "../../../interfaces/service.interface";
import { getOneResource } from "../../../utils/getOneResource";
import { getAllService } from "../../../api/servicesApi/serviceApi";
import {
  getStoredBranchId,
  openBranchSelectorModal,
} from "../../../stores/branchStore";
import {
  addStudy,
  removeStudy,
  selectedStudiesStore,
  selectedServiceStore,
  selectQuoterService,
  ensureQuoterStudiesSynced,
} from "../../../stores/quoterStore";

const SERVICES_PER_PAGE = 8;
const STUDIES_PER_PAGE = 8;
const SEARCH_DEBOUNCE_MS = 350;

const QuoterSelectStudies = () => {
  const [branchId] = useState<string | null>(() => getStoredBranchId());
  const [services, setServices] = useState<Service[]>([]);
  const [selectedSlug, setSelectedSlug] = useState("");
  const [serviceDetail, setServiceDetail] = useState<Service | null>(null);
  const [isLoadingDetail, setIsLoadingDetail] = useState(false);
  const [searchInput, setSearchInput] = useState("");
  const [search, setSearch] = useState("");

  const selectedStudies = useStore(selectedStudiesStore);
  const persistedService = useStore(selectedServiceStore);

  useEffect(() => {
    ensureQuoterStudiesSynced();
  }, []);

  useEffect(() => {
    if (!branchId) return;
    getAllService(branchId)
      .then(setServices)
      .catch(() => setServices([]));
  }, [branchId]);

  // Only services with studies actually attached are quotable.
  const servicesWithStudies = useMemo(
    () => services.filter((service) => (service._count?.studies ?? 0) > 0),
    [services],
  );

  const servicesTotalPages = Math.max(
    Math.ceil(servicesWithStudies.length / SERVICES_PER_PAGE),
    1,
  );
  const {
    currentPage: servicesPage,
    nextPage: servicesNextPage,
    prevPage: servicesPrevPage,
    setPage: setServicesPage,
  } = usePagination({ totalPages: servicesTotalPages, initialPage: 1 });

  const pagedServices = useMemo(
    () =>
      servicesWithStudies.slice(
        (servicesPage - 1) * SERVICES_PER_PAGE,
        servicesPage * SERVICES_PER_PAGE,
      ),
    [servicesWithStudies, servicesPage],
  );

  // Pre-select whichever service the quoter already has studies from.
  useEffect(() => {
    if (persistedService && !selectedSlug) {
      setSelectedSlug(persistedService.slug);
    }
  }, [persistedService, selectedSlug]);

  // Keep the service list on the page that actually contains the current selection.
  useEffect(() => {
    if (!selectedSlug || servicesWithStudies.length === 0) return;
    const index = servicesWithStudies.findIndex(
      (service) => service.slug === selectedSlug,
    );
    if (index >= 0) {
      setServicesPage(Math.floor(index / SERVICES_PER_PAGE) + 1);
    }
  }, [selectedSlug, servicesWithStudies]);

  // Studies come paginated straight from GET /services/:idOrSlug — each
  // page turn re-requests that same endpoint with page/limit.
  const studiesTotalPages = serviceDetail?.studies?.totalPages ?? 1;
  const {
    currentPage: studiesPage,
    nextPage: studiesNextPage,
    prevPage: studiesPrevPage,
    setPage: setStudiesPage,
  } = usePagination({ totalPages: studiesTotalPages, initialPage: 1 });

  useEffect(() => {
    setStudiesPage(1);
  }, [selectedSlug]);

  // Studies search is scoped to the selected service — clear it whenever
  // the user switches service so a stale term doesn't silently filter
  // the newly picked one.
  useEffect(() => {
    setSearchInput("");
    setSearch("");
  }, [selectedSlug]);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setSearch(searchInput.trim());
    }, SEARCH_DEBOUNCE_MS);

    return () => clearTimeout(timeout);
  }, [searchInput]);

  useEffect(() => {
    setStudiesPage(1);
  }, [search]);

  useEffect(() => {
    if (!selectedSlug || !branchId) {
      setServiceDetail(null);
      return;
    }

    let cancelled = false;
    setIsLoadingDetail(true);

    getOneResource<Service>("services", selectedSlug, {
      branchId,
      page: studiesPage,
      limit: STUDIES_PER_PAGE,
      search,
    })
      .then((data) => {
        if (cancelled) return;
        setServiceDetail(data);
        if (data?.id && data.priceSheetId) {
          selectQuoterService({
            id: data.id,
            slug: data.slug,
            name: data.name,
            priceSheetId: data.priceSheetId,
          });
        }
      })
      .finally(() => {
        if (!cancelled) setIsLoadingDetail(false);
      });

    return () => {
      cancelled = true;
    };
  }, [selectedSlug, branchId, studiesPage, search]);

  const studies = serviceDetail?.studies?.data ?? [];
  const totalStudies = serviceDetail?.studies?.total ?? 0;

  const handleAddStudy = (study: Study) => addStudy(study);
  const handleDeletStudy = (studyId: string) => removeStudy(studyId);

  const handleOpenBranchSelector = async () => {
    await openBranchSelectorModal();
  };

  if (!branchId) {
    return (
      <div className="flex h-full flex-col items-center justify-center px-6 py-16 text-center">
        <div className="mb-6 flex h-20 w-20 items-center justify-center rounded-clinical-lg bg-green-light/10">
          <MapPin className="h-9 w-9 text-green-light" strokeWidth={1.5} />
        </div>

        <h3 className="text-lg font-black tracking-tight text-green-light">
          Selecciona una sucursal para cotizar
        </h3>
        <p className="mt-2 max-w-xs text-sm leading-relaxed text-grey-custom">
          Los precios varían por sucursal. Elige la tuya para ver tarifas y
          agregar estudios a tu cotización.
        </p>

        <Button
          type="button"
          onClick={handleOpenBranchSelector}
          variant="primary"
          size="lg"
          className="mt-8"
        >
          <MapPin className="h-4 w-4" />
          Elegir sucursal
        </Button>
      </div>
    );
  }

  const serviceOptions = [
    { value: "", label: "Selecciona un servicio" },
    ...pagedServices.map((service) => ({
      value: service.slug,
      label: service.name,
    })),
  ];

  const hasPriceSheet = Boolean(serviceDetail?.priceSheet);

  return (
    <div className="flex h-full flex-col px-4 py-6 sm:px-6 lg:px-8 lg:py-6">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
        <div className="w-full sm:max-w-md">
          <SelectInput
            id="quoter-service"
            name="service"
            label="Servicio"
            placeholder="Selecciona un servicio"
            options={serviceOptions}
            value={selectedSlug}
            onChange={(e) => setSelectedSlug(e.target.value)}
          />
        </div>

        {hasPriceSheet && (
          <div className="inline-flex w-fit items-center gap-2 self-start rounded-full border border-green-primary/15 bg-green-primary/8 px-3 py-1 text-[11px] font-bold uppercase tracking-wide text-green-primary sm:self-auto">
            <span className="h-1.5 w-1.5 rounded-full bg-green-primary" />
            {isLoadingDetail ? "Cargando..." : `${totalStudies} disponibles`}
          </div>
        )}
      </div>

      {servicesTotalPages > 1 && (
        <div className="mt-3 flex items-center justify-between gap-3">
          <Pagination
            currentPage={servicesPage}
            totalPages={servicesTotalPages}
            onPageChange={setServicesPage}
            nextPage={servicesNextPage}
            prevPage={servicesPrevPage}
          />
          <span className="shrink-0 text-[11px] font-semibold text-grey-custom">
            {`${servicesPage} / ${servicesTotalPages}`}
          </span>
        </div>
      )}

      {hasPriceSheet && (
        <div className="relative mt-5 w-full sm:max-w-xs">
          <Search className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-grey-custom/70" />
          <input
            type="text"
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
            placeholder="Buscar por nombre o código..."
            aria-label="Buscar estudios por nombre o código"
            className="w-full rounded-clinical-sm border border-ui-border bg-white py-2.5 pl-10 pr-9 text-sm text-green-light placeholder:text-grey-custom/70 transition focus:border-green-primary focus:outline-none focus:ring-2 focus:ring-green-primary"
          />
          {searchInput && (
            <button
              type="button"
              onClick={() => setSearchInput("")}
              aria-label="Limpiar búsqueda"
              className="absolute right-3 top-1/2 -translate-y-1/2 text-grey-custom/70 transition hover:text-green-light"
            >
              <X className="h-4 w-4" />
            </button>
          )}
        </div>
      )}

      <div className="mt-5 flex-1">
        {!selectedSlug ? (
          <div className="py-10 text-center text-grey-custom">
            Elige un servicio para ver sus estudios disponibles.
          </div>
        ) : isLoadingDetail && studies.length === 0 ? (
          <div className="py-10 text-center text-grey-custom">
            Cargando estudios...
          </div>
        ) : !hasPriceSheet ? (
          <div className="py-10 text-center text-grey-custom">
            Este servicio no tiene un tarifario público disponible. Consulta
            precios directamente en sucursal.
          </div>
        ) : (
          <div
            className={`grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-5 lg:grid-cols-3 xl:grid-cols-4 transition-opacity ${
              isLoadingDetail ? "opacity-50 pointer-events-none" : ""
            }`}
          >
            {studies.length > 0 ? (
              studies.map((study: Study) => {
                const isAdded = selectedStudies.some(
                  (s) => s.id === study.id,
                );
                return (
                  <CardQuoteStudy
                    key={study.id}
                    isAdded={isAdded}
                    handleAddStudy={handleAddStudy}
                    handleDeletStudy={handleDeletStudy}
                    study={study}
                  />
                );
              })
            ) : (
              <p className="col-span-1 text-center text-grey-custom sm:col-span-2 lg:col-span-3 xl:col-span-4">
                {search
                  ? `No hay resultados para "${search}".`
                  : "No se encontraron estudios."}
              </p>
            )}
          </div>
        )}
      </div>

      {hasPriceSheet && studiesTotalPages > 1 && (
        <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <Pagination
            nextPage={studiesNextPage}
            prevPage={studiesPrevPage}
            currentPage={studiesPage}
            onPageChange={setStudiesPage}
            totalPages={studiesTotalPages}
          />

          <div className="self-end bg-green-light px-3 py-1 text-sm font-semibold text-white shadow-inner rounded-clinical-sm sm:self-auto">
            {`${studiesPage} / ${studiesTotalPages}`}
          </div>
        </div>
      )}
    </div>
  );
};

export default QuoterSelectStudies;
