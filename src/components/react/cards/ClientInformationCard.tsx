import type { Client } from "../../../interfaces/client.interface"

interface ClientInformationCardProps {
    client: Client | null
}
const ClientInformationCard = ({ client }: ClientInformationCardProps) => {
    
    return (
        <div className="bg-gray-100 rounded-2xl p-4 shadow-sm">
            <h2 className="text-center font-bold text-green-primary mb-3">
                Información del cliente
            </h2>
            {client ? (
                <div className="text-sm leading-relaxed">
                    <p className="mb-1">
                        <span className="font-semibold text-green-secondary">Tipo de cliente:</span>{" "}
                        <span className="text-gray-800">{client?.clientType}</span>
                    </p>
                    <p className="mb-1">
                        <span className="font-semibold text-green-secondary">Nombre:</span>{" "}
                        <span className="text-gray-800">
                            {client?.name} {client?.lastName}
                        </span>
                    </p>
                    <p className="mb-1">
                        <span className="font-semibold text-green-secondary">Teléfono:</span>{" "}
                        <span className="text-gray-800">{client?.phoneNumber}</span>
                    </p>
                    <p>
                        <span className="font-semibold text-green-secondary">Correo electrónico:</span>{" "}
                        <span className="text-gray-800">{client?.email}</span>
                    </p>
                </div>
            ) : (
                <p className="text-gray-500 italic text-sm text-center">
                    No hay informacion de cliente.
                </p>
            )}
        </div>
    )
}

export default ClientInformationCard
