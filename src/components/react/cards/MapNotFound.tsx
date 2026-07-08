import { Icon } from "@iconify/react";
import type { Branch } from "../../../interfaces/branch.interface";
import NavLinkButton from "../navigation/NavLinkButton";
interface MapNotFoundProps {
  branch: Branch;
}

const MapNotFound = ({ branch }: MapNotFoundProps) => {
  const fullAddress = `${branch.address.street}, ${branch.address.extNumber}${branch.address.intNumber ? ` Int. ${branch.address.intNumber}` : ""}, ${branch.address.neighborhood}, CP ${branch.address.zipCode}, ${branch.address.city}`;

  return (
    <div className="flex min-h-100 flex-col items-center justify-center p-8 text-center bg-ui-bg">
      <div className="rounded-full bg-white p-4 mb-4">
        <Icon
          icon={"tabler:map-cancel"}
          className="w-10 h-auto text-red-custom"
        />
      </div>
      <p className="text-lg font-black tracking-tight text-green-light">
        Mapa no disponible
      </p>
      <p className="mt-2 text-sm text-grey-custom max-w-60">
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
