import type { Client } from "../../../interfaces/client.interface"

interface ClientInformationCardProps {
    client: Client | null
}
const ClientInformationCard = ({ client }: ClientInformationCardProps) => {
    
    return (
        <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-200">
            <h2 className="text-center  font-extrabold text-green-primary mb-4 pb-2 border-b border-green-secondary/30">
                Información del cliente
            </h2>
            {client ? (
                <div className="space-y-3">
                    <div className="flex items-start">
                        <span className="font-bold text-green-secondary w-1/2">Tipo de cliente:</span>{" "}
                        <span className="text-gray-700 w-1/2">{client?.clientType}</span>
                    </div>
                    <div className="flex items-start">
                        <span className="font-bold text-green-secondary w-1/2">Nombre:</span>{" "}
                        <span className="text-gray-700 w-1/2">
                            {client?.name} {client?.lastName}
                        </span>
                    </div>
                    <div className="flex items-start">
                        <span className="font-bold text-green-secondary w-1/2">Teléfono:</span>{" "}
                        <span className="text-gray-700 w-1/2">{client?.phoneNumber}</span>
                    </div>
                    <div className="flex items-start">
                        <span className="font-bold text-green-secondary w-1/2">Correo electrónico:</span>{" "}
                        <span className="text-gray-700 w-1/2">{client?.email}</span>
                    </div>
                </div>
            ) : (
                <p className="text-gray-600 text-base py-4 text-center">
                    No hay informacion de cliente.
                </p>
            )}
        </div>
    )
}

export default ClientInformationCard
