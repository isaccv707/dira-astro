import type { ReactNode } from "react";

import type { Study } from "../../../interfaces/study.interface";
import { getCatalogName } from "../../../interfaces/study.interface";
import { getStudyFacts } from "../../../utils/studyFacts";
import Eyebrow from "../ui/Eyebrow";
import Price from "../ui/Price";
import StudyCode from "../ui/StudyCode";
import PanelParameters from "../panel/PanelParameters";
import CartToggleButton from "./CartToggleButton";

interface StudyRowProps {
  study: Study;
  /** Heading level inside the page outline (h3 under a section's h2). */
  headingLevel?: "h2" | "h3";
  /** Replaces the default "add to selected studies" button (e.g. the quoter). */
  action?: ReactNode;
}

/**
 * One study as a line on a specimen label: code, name, the facts a patient
 * needs (sample, fasting, delivery), price and the add action. Rendered as
 * an <li>; place it inside a <ul> (see StudyCatalog).
 */
const StudyRow = ({
  study,
  headingLevel: Heading = "h3",
  action,
}: StudyRowProps) => {
  const facts = getStudyFacts(study);
  const section = getCatalogName(study.section);
  const { priceInfo } = study;

  return (
    <li className="relative grid gap-4 py-5 pl-6 pr-4 sm:grid-cols-[minmax(0,1fr)_auto] sm:items-center sm:pr-6">
      {/* Specimen-label bar */}
      <span
        aria-hidden="true"
        className="absolute inset-y-5 left-0 w-1 rounded-r-full bg-green-primary"
      />

      <div className="min-w-0">
        <div className="flex flex-wrap items-center gap-2">
          <StudyCode code={study.code} />
          {study.isPanel && <Eyebrow>Perfil</Eyebrow>}
          {section && (
            <span className="text-xs font-medium text-ink-subtle">{section}</span>
          )}
        </div>

        <Heading className="mt-2 text-base font-semibold leading-snug sm:text-lg">
          <a
            href={`/study/${study.slug}`}
            className="rounded-sm text-ink underline-offset-4 transition-colors duration-150 hover:text-brand-ink hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-green-primary"
          >
            {study.name}
          </a>
        </Heading>

        {facts.length > 0 && (
          <ul className="mt-1.5 flex flex-wrap gap-x-2 text-sm text-ink-muted">
            {facts.map((fact, index) => (
              <li key={fact} className="flex items-center gap-2">
                {index > 0 && (
                  <span aria-hidden="true" className="text-ink-subtle">
                    ·
                  </span>
                )}
                {fact}
              </li>
            ))}
          </ul>
        )}

        {study.isPanel && (
          <div className="mt-3 max-w-md">
            <PanelParameters studyId={study.id} />
          </div>
        )}
      </div>

      <div className="flex items-center justify-between gap-4 sm:flex-col sm:items-end sm:justify-center">
        {priceInfo?.showPrice ? (
          <Price value={priceInfo.price} size="md" />
        ) : (
          <span className="text-sm text-ink-muted">
            {priceInfo?.message ?? "Consulta el precio en sucursal"}
          </span>
        )}

        {action ?? <CartToggleButton study={study} />}
      </div>
    </li>
  );
};

export default StudyRow;
