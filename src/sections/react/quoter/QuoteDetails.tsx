import { useEffect } from "react";
import { useStore } from "@nanostores/react";
import {
  clientStore,
  selectedStudiesStore,
  totalsStore,
  removeStudy,
  updateStudyQuantity,
  ensureQuoterStudiesSynced,
} from "../../../stores/quoterStore";
import Accordion from "../../../components/react/accordion/Accordion";
import ClientInformationCard from "../../../components/react/cards/ClientInformationCard";
import TotalQuoteCard from "../../../components/react/cards/TotalQuoteCard";
import Button from "../../../components/react/buttons/Button";
import SelectedStudiesAccordion from "../../../components/react/accordion/SelectedStudiesAccordion";
import useQuotationPdf from "../../../hooks/useQuotationPdf";
import { FileText } from "lucide-react";

const QuoteDetails = () => {
  const selectedStudies = useStore(selectedStudiesStore);
  const client = useStore(clientStore);
  const totals = useStore(totalsStore);

  useEffect(() => {
    ensureQuoterStudiesSynced();
  }, []);

  const { viewQuotation, downloadQuotation, isDownloading, isViewing } =
    useQuotationPdf({ client, selectedStudies });
  return (
    <div className="w-full h-full">
      <header className="bg-green-primary rounded-t-clinical-lg px-4 py-4 sm:px-6 text-center sticky top-0 z-10">
        <div className="flex items-center justify-center gap-2">
          <FileText className="h-5 w-5 text-white/90" strokeWidth={2} />
          <h1 className="text-white font-bold text-base sm:text-lg">
            Detalles de tu cotización
          </h1>
        </div>
        <small className="text-white text-xs sm:text-sm opacity-90">
          Aquí encontrarás todos los detalles de tu cotización
        </small>
      </header>

      <div className="flex-1 overflow-y-auto max-h-[75vh] px-4 py-5 sm:px-5 space-y-4 scrollbar-thin scrollbar-thumb-green-primary scrollbar-track-ui-bg rounded-b-clinical-lg">
        <ClientInformationCard client={client} />

        <Accordion
          id={"studies"}
          title={`Estudios seleccionados (${selectedStudies.length})`}
        >
          <SelectedStudiesAccordion
            updateStudyQuantity={updateStudyQuantity}
            selectedStudies={selectedStudies}
            removeStudy={removeStudy}
          />
        </Accordion>

        <TotalQuoteCard totals={totals} selectedStudies={selectedStudies} />

        <div className="flex flex-col gap-3 pt-1 sm:flex-row">
          <Button
            text={isViewing ? "Generando..." : "Ver cotización"}
            variant="outline"
            size="sm"
            width="full"
            type="button"
            onClick={viewQuotation}
            isLoading={isViewing}
          />
          <Button
            text={isDownloading ? "Generando..." : "Descargar cotización"}
            variant="primary"
            size="sm"
            width="full"
            type="button"
            onClick={downloadQuotation}
            isLoading={isDownloading}
          />
        </div>
      </div>
    </div>
  );
};

export default QuoteDetails;
