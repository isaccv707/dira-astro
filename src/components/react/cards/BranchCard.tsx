import type { Branch } from "../../../interfaces/branch.interface";
import { getFullAddress } from "../../../utils/maps.utils";
import NavLinkButton from "../navigation/NavLinkButton";
import ContactItem from "../ui/ContactItem";
import { buildTelUrl, buildWhatsappUrl, formatPhone } from "../../../utils/whatsapp";
import { generalWhatsappMessage } from "../../../utils/whatsappMessages";
import { formatSchedule, getOpenStatus } from "../../../utils/schedule.utils";
import { Clock } from "lucide-react";
import Eyebrow from "../ui/Eyebrow";

interface BranchCardProps {
  branch: Branch;
}

const BranchCard = ({ branch }: BranchCardProps) => {
  if (!branch) return null;
  const {
    name,
    phone,
    email,
    state,
    address: { references },
    urlResults,
  } = branch;

  const fullAddress = getFullAddress(branch);
  // "Lunes a Viernes 07:00 a 19:00, Sábado ..." → one line per group.
  const scheduleLines = formatSchedule(branch.schedules).split(", ").filter(Boolean);
  const openStatus = getOpenStatus(branch.schedules);

  return (
    <article className="rounded-clinical-md border border-ui-border bg-white p-6 shadow-xs">
      <div className="relative">
        <div className="flex items-start justify-between gap-4">
          <div className="flex-1">
            {state?.name && (
              <span className="text-xs font-semibold text-brand-ink">
                {state.name}
              </span>
            )}
            <h2 className="mt-3 text-xl font-bold tracking-tight text-ink leading-tight">
              {name}
            </h2>
            <p className="mt-2 text-sm font-medium text-ink-muted leading-relaxed">
              {fullAddress}
            </p>
            {references && (
              <div className="mt-2 flex items-start gap-1.5 text-sm text-ink-muted">
                <span className="font-semibold text-ink">Referencias:</span>
                <span>
                  {references}
                </span>
              </div>
            )}
          </div>
        </div>

        <div className="mt-6 space-y-3 border-t border-ui-border pt-6 text-sm">
          <ContactItem
            icon="lucide:phone-call"
            value={phone ? formatPhone(phone) : phone}
            label={"Tel"}
            href={phone ? buildTelUrl(phone) : undefined}
          />
          <ContactItem
            icon="tabler:brand-whatsapp"
            value={phone ? formatPhone(phone) : phone}
            label={"WhatsApp"}
            href={phone ? buildWhatsappUrl(phone, generalWhatsappMessage(name)) : undefined}
          />
          {scheduleLines.length > 0 && (
            <div className="flex items-start gap-3">
              <Clock aria-hidden="true" className="mt-0.5 h-4 w-4 shrink-0 text-brand-ink" />
              <div className="min-w-0 space-y-1.5">
                <p className="font-semibold text-ink">Horario</p>
                {openStatus && (
                  <Eyebrow tone={openStatus.isOpen ? "brand" : "neutral"} live={openStatus.isOpen}>
                    {openStatus.label}
                  </Eyebrow>
                )}
                <ul className="text-ink-muted tabular-nums">
                  {scheduleLines.map((line) => (
                    <li key={line}>{line}</li>
                  ))}
                </ul>
              </div>
            </div>
          )}
          <ContactItem
            icon="lucide:mail"
            value={email}
            label={"Email"}
            isEmail
            href={email ? `mailto:${email}` : undefined}
          />
        </div>

        <div className="mt-6">
          <NavLinkButton
            path={urlResults}
            target="_blank"
            text="Consultar resultados"
            icon="lucide:test-tube-diagonal"
            width="full"
          />
        </div>
      </div>
    </article>
  );
};

export default BranchCard;
