import { Icon } from "@iconify/react";
import type { Branch } from "../../../interfaces/branch.interface";
import NavLinkButton from "../navigation/NavLinkButton";
import { getFullAddress } from "../../../utils/maps.utils";
interface MapNotFoundProps {
  branch: Branch;
}

const MapNotFound = ({ branch }: MapNotFoundProps) => {
  const fullAddress = getFullAddress(branch);

  return (
    <div className="flex min-h-100 flex-col items-center justify-center p-8 text-center bg-ui-bg">
      <div className="rounded-full bg-white p-4 mb-4">
        <Icon
          icon={"tabler:map-cancel"}
          className="h-10 w-auto text-ink-subtle" aria-hidden="true"
        />
      </div>
      <p className="text-lg font-bold tracking-tight text-ink">
        Mapa no disponible
      </p>
      <p className="mt-2 text-sm text-ink-muted max-w-60">
        No pudimos cargar el mapa interactivo, pero puedes ver la ubicación
        directamente en Google Maps.
      </p>
      <NavLinkButton
        className="mt-6"
        variant="outline"
        path={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(fullAddress)}`}
        target="_blank"
        text="Ir a Google Maps"
      />
    </div>
  );
};

export default MapNotFound;
