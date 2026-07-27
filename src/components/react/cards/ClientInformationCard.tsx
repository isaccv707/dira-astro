import { User, Phone, Mail, Building2 } from "lucide-react";
import type { Client } from "../../../interfaces/client.interface";

interface ClientInformationCardProps {
  client: Client | null;
}

const rows = (client: Client) => [
  {
    icon: client.clientType === "company" ? Building2 : User,
    label: "Tipo de cliente",
    value: client.clientType === "company" ? "Empresa" : "Particular",
  },
  {
    icon: User,
    label: "Nombre",
    value: [client.name, client.lastName].filter(Boolean).join(" "),
  },
  { icon: Phone, label: "Teléfono", value: client.phoneNumber },
  { icon: Mail, label: "Correo electrónico", value: client.email },
];

const ClientInformationCard = ({ client }: ClientInformationCardProps) => {
  return (
    <div className="bg-white rounded-clinical-md p-5 sm:p-6 shadow-xs border border-ui-border">
      <h2 className="font-black tracking-tight text-green-light mb-4 pb-2 border-b border-green-secondary/30">
        Información del cliente
      </h2>
      {client ? (
        <div className="space-y-3">
          {rows(client).map(({ icon: Icon, label, value }) => (
            <div key={label} className="flex items-start gap-3">
              <Icon
                className="mt-0.5 h-4 w-4 shrink-0 text-green-secondary"
                strokeWidth={2}
              />
              <div className="min-w-0 flex-1">
                <p className="text-xs font-bold uppercase tracking-wide text-green-secondary">
                  {label}
                </p>
                <p className="wrap-break-word text-sm text-grey-custom leading-relaxed">
                  {value || "—"}
                </p>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-grey-custom text-sm py-4 text-center leading-relaxed">
          No hay información de cliente.
        </p>
      )}
    </div>
  );
};

export default ClientInformationCard;
