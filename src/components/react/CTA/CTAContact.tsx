import { SOCIAL_NETWORKS } from "../../../constants/socialNetworks";
import NavLinkButton from "../navigation/NavLinkButton";

const CTAContact = () => {
  return (
    <div className="rounded-2xl border border-green-primary/15 bg-green-primary/5 p-4">
      <p className="text-xs font-medium text-green-primary sm:text-sm">
        ¿Necesitas más información?
      </p>
      <p className="mt-1 text-xs text-neutral-600 sm:text-sm mb-2">
        Contáctanos por el medio de tu preferencia
      </p>
      <div className="flex gap-2 flex-row sm:items-center sm:gap-3">
        {SOCIAL_NETWORKS.map(({ name, route, icon }) => (
          <NavLinkButton
            path={route}
            icon={icon}
            target={name !== "Gmail" ? "_blank" : "_self"}
            className="inline-flex items-center justify-center transition hover:scale-105 active:scale-95"
            iconClassName="w-7 h-7"
            variant={"link"}
          />
        ))}
      </div>
    </div>
  );
};

export default CTAContact;
