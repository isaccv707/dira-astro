import type { ReactNode } from "react";
import { ArrowRight, Clock, FlaskConical, Timer } from "lucide-react";
import clsx from "clsx";

import type { Study } from "../../../interfaces/study.interface";
import { getCatalogName } from "../../../interfaces/study.interface";
import { formatDeliveryTime } from "../../../utils/studyFacts";
import { getFastingHours } from "../../../utils/studyPreparation";
import { cardStyles } from "../../../styles/ui";
import { Buttonstyles } from "../../../styles/buttonsStyles";
import Eyebrow from "../ui/Eyebrow";
import Price from "../ui/Price";
import StudyCode from "../ui/StudyCode";
import PanelParameters from "../panel/PanelParameters";
import CartToggleButton from "./CartToggleButton";

interface StudyCardProps {
  study: Study;
  /** Heading level inside the page outline (h3 under a section's h2). */
  headingLevel?: "h2" | "h3";
  /** Replaces the default "add to selected studies" button (e.g. the quoter). */
  action?: ReactNode;
}

/**
 * One study as a vertical specimen label: code and type on top, name, the
 * facts a patient needs (sample, fasting, delivery), then price and actions
 * pinned to the bottom so cards in a row line up. Rendered as an <li>;
 * place it inside a grid <ul> (see StudyCatalog / StudyList).
 */
const StudyCard = ({ study, headingLevel: Heading = "h3", action }: StudyCardProps) => {
  const { priceInfo } = study;
  const section = getCatalogName(study.section);
  const sample = getCatalogName(study.sampleType);
  const fasting = getFastingHours(study.preparation);
  const delivery = formatDeliveryTime(study.deliveryTime);

  return (
    <li className={clsx(cardStyles({ padding: "none" }), "flex h-full flex-col overflow-hidden")}>
      {/* Specimen-label bar: yellow for profiles, green for single studies */}
      <span
        aria-hidden="true"
        className={clsx("h-1.5 w-full", study.isPanel ? "bg-yellow-primary" : "bg-green-primary")}
      />

      <div className="flex grow flex-col p-5">
        <div className="flex flex-wrap items-center gap-2">
          <StudyCode code={study.code} />
          {study.isPanel && <Eyebrow tone="accent">Perfil</Eyebrow>}
        </div>

        {section && (
          <p className="mt-3 text-xs font-medium text-ink-subtle">{section}</p>
        )}

        <Heading className={clsx("text-base font-semibold leading-snug", section ? "mt-1" : "mt-3")}>
          <a
            href={`/study/${study.slug}`}
            className="rounded-sm text-ink underline-offset-4 transition-colors duration-150 hover:text-brand-ink hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-green-primary"
          >
            {study.name}
          </a>
        </Heading>

        {(sample || fasting || delivery) && (
          <dl className="mt-4 space-y-2 border-t border-ui-border pt-4 text-sm">
            {sample && (
              <div className="flex items-center gap-2">
                <FlaskConical aria-hidden="true" className="h-4 w-4 shrink-0 text-brand-ink" />
                <dt className="sr-only">Muestra</dt>
                <dd className="text-ink-muted">{sample}</dd>
              </div>
            )}
            {fasting && (
              <div className="flex items-center gap-2">
                <Timer aria-hidden="true" className="h-4 w-4 shrink-0 text-yellow-ink" />
                <dt className="sr-only">Preparación</dt>
                <dd>
                  <span className="rounded-clinical-sm bg-yellow-primary px-1.5 py-0.5 text-xs font-semibold text-black-custom">
                    Ayuno de {fasting} h
                  </span>
                </dd>
              </div>
            )}
            {delivery && (
              <div className="flex items-center gap-2">
                <Clock aria-hidden="true" className="h-4 w-4 shrink-0 text-brand-ink" />
                <dt className="sr-only">Entrega</dt>
                <dd className="text-ink-muted">{delivery}</dd>
              </div>
            )}
          </dl>
        )}

        {study.isPanel && (
          <div className="mt-4">
            <PanelParameters studyId={study.id} />
          </div>
        )}

        {/* Bottom block: price + actions, aligned across the row */}
        <div className="mt-auto pt-5">
          <div className="border-t border-ui-border pt-4">
            {priceInfo?.showPrice ? (
              <Price value={priceInfo.price} size="md" />
            ) : (
              <p className="text-sm text-ink-muted">
                {priceInfo?.message ?? "Consulta el precio en sucursal"}
              </p>
            )}
          </div>

          <div className="mt-4 flex flex-wrap items-center gap-2 [&>*]:flex-1">
            <a
              href={`/study/${study.slug}`}
              aria-label={`Ver detalle de ${study.name}`}
              className={Buttonstyles({ variant: "outline", size: "sm" })}
            >
              Ver detalle
              <ArrowRight aria-hidden="true" className="h-4 w-4" />
            </a>
            {action ?? <CartToggleButton study={study} />}
          </div>
        </div>
      </div>
    </li>
  );
};

export default StudyCard;
