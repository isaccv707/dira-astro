import { Icon } from "@iconify/react";
import { CheckCircle2, Clock, ClipboardList } from "lucide-react";
import type { Branch } from "../../../interfaces/branch.interface";
import MapNotFound from "./MapNotFound";
import { getBranchMapEmbedUrl } from "../../../utils/maps.utils";
import { formatSchedule } from "../../../utils/schedule.utils";

interface MapCardProps {
  branch: Branch;
}

const MapCard = ({ branch }: MapCardProps) => {
  const mapUrl = getBranchMapEmbedUrl(branch);
  const scheduleText = formatSchedule(branch.schedules);
  const services = branch.services ?? [];

  return (
    <aside className="w-full">
      <div className="overflow-hidden rounded-clinical-lg border border-ui-border bg-white shadow-xs ring-1 ring-black/5">
        {/* Map — full-bleed, no inset */}
        <div className="bg-ui-bg">
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

        {/* Current-selection confirmation */}
        <div className="flex items-center gap-2 border-t border-ui-border px-5 py-4 text-sm text-green-primary">
          <CheckCircle2 className="h-4 w-4 shrink-0" strokeWidth={2} />
          <span>
            Actualmente esta es la sucursal que seleccionaste para realizar
            tus estudios
          </span>
        </div>

        {/* Facts: schedule, services */}
        <div className="grid grid-cols-1 gap-6 border-t border-ui-border px-5 py-5 sm:grid-cols-2">
          <div className="flex items-start gap-3">
            <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-green-primary/10 text-green-primary">
              <Clock className="h-4 w-4" />
            </div>
            <div>
              <p className="text-xs font-bold uppercase tracking-widest text-grey-custom">
                Horarios
              </p>
              <p className="mt-1 text-sm text-green-light">
                {scheduleText || "Consulta directamente en sucursal"}
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-green-primary/10 text-green-primary">
              <ClipboardList className="h-4 w-4" />
            </div>
            <div>
              <p className="text-xs font-bold uppercase tracking-widest text-grey-custom">
                Servicios
              </p>
              <p className="mt-1 flex flex-wrap gap-x-1 text-sm text-green-light">
                {services.length > 0
                  ? services.map((service, index) => (
                      <span key={service.id}>
                        <a
                          href={`/service/${service.slug}`}
                          className="hover:underline"
                        >
                          {service.name}
                        </a>
                        {index < services.length - 1 && (
                          <span className="text-grey-custom"> | </span>
                        )}
                      </span>
                    ))
                  : "Consulta nuestro catálogo completo"}
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-4 flex items-center gap-2 px-2 text-grey-custom/70">
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
