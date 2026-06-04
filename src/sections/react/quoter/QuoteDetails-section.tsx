import { useQuoterContext } from "../../../hooks/useQuoterContext";
import Accordion from "../../../components/react/accordion/Accordion";
import ClientInformationCard from "../../../components/react/cards/ClientInformationCard";
import TotalQuoteCard from "../../../components/react/cards/TotalQuoteCard";
import Button from "../../../components/react/buttons/Button";
import SelectedStudiesAccordion from "../../../components/react/accordion/SelectedStudiesAccordion";
import useQuotationPdf from "../../../hooks/useQuotationPdf";

const QuoteDetails = () => {
  const { selectedStudies, client, totals, removeStudy, updateStudyQuantity } =
    useQuoterContext();

  const { viewQuotation, downloadQuotation, isDownloading, isViewing } =
    useQuotationPdf({ client, selectedStudies });
  console.log(downloadQuotation);
  return (
    <div className="w-full h-full">
      <header className="bg-green-primary rounded-t-2xl p-4 text-center sticky top-0 z-10">
        <h1 className="text-white font-bold text-lg">
          Detalles de tu cotización
        </h1>
        <small className="text-white text-sm opacity-90">
          Aquí encontrarás todos los detalles de tu cotización
        </small>
      </header>

      <div className="flex-1 overflow-y-auto max-h-[75vh] px-4 py-5 space-y-5 scrollbar-thin scrollbar-thumb-green-600 scrollbar-track-gray-100 rounded-b-2xl">
        <ClientInformationCard client={client} />

        <Accordion
          id={"studies"}
          title={`Estudios Seleccionados: ${selectedStudies.length}`}
        >
          <SelectedStudiesAccordion
            updateStudyQuantity={updateStudyQuantity}
            selectedStudies={selectedStudies}
            removeStudy={removeStudy}
          />
        </Accordion>

        <TotalQuoteCard totals={totals} selectedStudies={selectedStudies} />

        <div className="flex flex-col sm:flex-row gap-3 justify-center mt-2">
          <Button
            text={isViewing ? "Generando..." : "Ver cotización"}
            variant="primary"
            size="sm"
            type="button"
            onClick={viewQuotation}
            isLoading={isViewing}
          />
          <Button
            text={isDownloading ? "Generando..." : "Descargar cotización"}
            variant="primary"
            size="sm"
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
