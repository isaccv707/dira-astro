import type { Branch } from "../../../interfaces/branch.interface";
import { getFullAddress } from "../../../utils/maps.utils";
import NavLinkButton from "../navigation/NavLinkButton";
import ContactItem from "../ui/ContactItem";

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

  return (
    <article className="branch-card group relative overflow-hidden rounded-clinical-lg border transition-all duration-300 p-6 shadow-xs border-ui-border bg-white hover:-translate-y-1 hover:shadow-sm">
      <div className="relative">
        <div className="flex items-start justify-between gap-4">
          <div className="flex-1">
            {state?.name && (
              <span className="inline-flex items-center rounded-full bg-green-secondary/10 px-3 py-1 text-xs font-bold text-green-secondary ring-1 ring-green-secondary/20">
                {state.name}
              </span>
            )}
            <h3 className="mt-3 text-xl font-black tracking-tight text-green-light leading-tight">
              {name}
            </h3>
            <p className="mt-2 text-sm font-medium text-grey-custom leading-relaxed">
              {fullAddress}
            </p>
            {references && (
              <div className="mt-2 flex items-start gap-1.5 text-xs text-grey-custom bg-green-secondary/10 p-2 rounded-clinical-sm border border-ui-border/50">
                <span className="font-bold text-green-primary">Ref:</span>
                <span className="font-bold text-green-secondary">
                  {references}
                </span>
              </div>
            )}
          </div>
        </div>

        <div className="mt-6 space-y-3 border-t border-ui-border pt-6 text-sm">
          <ContactItem icon="lucide:phone-call" value={phone} label={"Tel"} />
          <ContactItem
            icon="tabler:brand-whatsapp"
            value={phone}
            label={"WhatsApp"}
          />
          <ContactItem
            icon="lucide:mail"
            value={email}
            label={"Email"}
            isEmail
          />
        </div>

        <div className="mt-6">
          <NavLinkButton
            path={urlResults}
            target="_blank"
            text="Consulta Resultados"
            icon="lucide:test-tube-diagonal"
            width="full"
          />
        </div>
      </div>
    </article>
  );
};

export default BranchCard;
