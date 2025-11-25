import { useQuoterContext } from "../../../hooks/useQuoterContext";
import Accordion from "../../../components/react/accordion/Accordion";
import ClientInformationCard from "../../../components/react/cards/ClientInformationCard";
import TotalQuoteCard from "../../../components/react/cards/TotalQuoteCard";
import Button from "../../../components/react/ui/Button";
import SelectedStudiesAccordion from "../../../components/react/accordion/SelectedStudiesAccordion";
import { accordionItems } from "../../../constants/accordionItems/accordionItems";
import useQuotationPdf from "../../../hooks/useQuotationPdf";

const QuotationDetailsSection = () => {
  const {
    selectedStudies,
    client,
    totals,
    removeStudy,
    updateStudyQuantity,
  } = useQuoterContext();

  const {
    viewQuotation,
    downloadQuotation,
    isLoading,
    hasClient,
    hasStudies,
  } = useQuotationPdf({ client, selectedStudies });

  const accordionSelectedStudies = accordionItems.map(({ id, title }) => ({
    id,
    title: `${title}: ${selectedStudies.length}`,
    content: (
      <SelectedStudiesAccordion
        updateStudyQuantity={updateStudyQuantity}
        selectedStudies={selectedStudies}
        removeStudy={removeStudy}
      />
    ),
  }));

  const actionsDisabled = isLoading || !hasClient || !hasStudies;

  return (
    <div className="rounded-2xl flex flex-col h-full">
      <div className="bg-green-secondary rounded-t-2xl p-4 text-center sticky top-0 z-10">
        <h1 className="text-white font-bold text-lg">Detalles de tu cotización</h1>
        <small className="text-white text-sm opacity-90">
          (Aquí encontrarás todos los detalles de tu cotización)
        </small>
      </div>

      <div className="flex-1 overflow-y-auto max-h-[75vh] px-4 py-5 space-y-5 scrollbar-thin scrollbar-thumb-green-600 scrollbar-track-gray-100 rounded-b-2xl">
        <ClientInformationCard client={client} />

        <Accordion items={accordionSelectedStudies} />

        <TotalQuoteCard totals={totals} selectedStudies={selectedStudies} />

        <div className="flex flex-col sm:flex-row gap-3 justify-center mt-2">
          <Button
            text={isLoading ? "Generando..." : "Ver cotización"}
            variant="submit"
            size="md"
            type="button"
            onClick={viewQuotation}
            disabled={actionsDisabled}
            isLoading={isLoading}
          />
          <Button
            text={isLoading ? "Generando..." : "Descargar cotización"}
            variant="submit"
            size="md"
            type="button"
            onClick={downloadQuotation}
            disabled={actionsDisabled}
            isLoading={isLoading}
          />
        </div>
      </div>
    </div>
  );
};

export default QuotationDetailsSection;
