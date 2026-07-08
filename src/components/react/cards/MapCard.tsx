import { Icon } from "@iconify/react";
import type { Branch } from "../../../interfaces/branch.interface";
import ContactItem from "../ui/ContactItem";
import MapNotFound from "./MapNotFound";
import { getBranchMapEmbedUrl } from "../../../utils/maps.utils";

interface MapCardProps {
  branch: Branch;
}

const MapCard = ({ branch }: MapCardProps) => {
  const mapUrl = getBranchMapEmbedUrl(branch);

  return (
    <aside className="w-full">
      <div className="overflow-hidden rounded-3xl border border-gray-100 bg-white shadow-sm ring-1 ring-black/5">
        <div className="p-4">
          <div className="overflow-hidden rounded-2xl bg-gray-100 ring-1 ring-gray-200 shadow-inner">
            {mapUrl ? (
              <iframe
                className="h-100 w-full"
                src={mapUrl}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                allowFullScreen
                title={`Mapa ${branch.name}`}
              />
            ) : (
              <MapNotFound branch={branch} />
            )}
          </div>

          <div className="mt-5 grid gap-4 rounded-2xl bg-linear-to-br from-green-primary/5 to-white p-5 ring-1 ring-green-primary/10 shadow-sm">
            <p className="text-xs font-extrabold uppercase tracking-widest text-green-primary">
              Información de Contacto
            </p>
            <div className="grid gap-3 text-sm">
              <ContactItem
                icon="lucide:phone-call"
                value={branch.phone}
                label={"Tel"}
              />
              <ContactItem
                icon="tabler:brand-whatsapp"
                value={branch.phone}
                label={"WhatsApp"}
              />
              <ContactItem
                icon="lucide:mail"
                value={branch.email}
                label={"Email"}
                isEmail
              />
            </div>
          </div>
        </div>
      </div>

      <div className="mt-4 flex items-center gap-2 px-2 text-gray-400">
        <Icon icon={"lucide:info"} />
        <p className="text-[10px] font-medium leading-tight">
          La visualización del mapa depende de la disponibilidad de Google Maps.
          Si no carga, usa el botón "Abrir en Google Maps".
        </p>
      </div>
    </aside>
  );
};

export default MapCard;
