import { Icon } from "@iconify/react";

import { branchWhatsappUrl } from "../../../constants/urlWhatsapp";
import { generalWhatsappMessage } from "../../../utils/whatsappMessages";
import { useActiveBranchContact } from "../../../hooks/useActiveBranchContact";
import type { ActiveBranchContact } from "../../../api/branchesApi/branchesApi";

interface Props {
  /** Active branch contact resolved on the server (Layout). */
  contact?: ActiveBranchContact | null;
}

/**
 * One tap to the active branch's WhatsApp, with a message that already names
 * the branch. On wider screens the button also shows the branch name, so the
 * visitor sees which branch they are about to write to.
 */
const FloatingIconWhatsapp = ({ contact: initialContact }: Props) => {
  const contact = useActiveBranchContact(initialContact);
  const branchName = contact?.name ?? null;
  const whatsappUrl = branchWhatsappUrl(contact?.phone, generalWhatsappMessage(branchName));

  if (!whatsappUrl) return null;

  const label = branchName
    ? `Escribir por WhatsApp a ${branchName} (se abre en otra pestaña)`
    : "Escribir por WhatsApp (se abre en otra pestaña)";

  return (
    <a
      href={whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={label}
      title={branchName ? `WhatsApp de ${branchName}` : "Escríbenos por WhatsApp"}
      className="flex h-14 min-w-14 items-center justify-center gap-2 rounded-full bg-brand-ink px-3.5 text-white sm:pr-5 shadow-md transition-colors duration-200 hover:bg-brand-ink-hover focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-green-primary focus-visible:ring-offset-2 motion-reduce:transition-none"
    >
      <Icon icon="tabler:brand-whatsapp" aria-hidden="true" className="h-7 w-7 shrink-0" />
      {branchName && (
        <span aria-hidden="true" className="hidden max-w-44 flex-col leading-tight sm:flex">
          <span className="text-2xs font-semibold uppercase tracking-wide text-white/90">
            WhatsApp
          </span>
          <span className="truncate text-sm font-bold">{branchName}</span>
        </span>
      )}
    </a>
  );
};

export default FloatingIconWhatsapp;
