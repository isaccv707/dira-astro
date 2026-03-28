import type { Branch } from "../../../interfaces/branch.interface"

interface MapCardProps {
    branch: Branch
}

const MapCard = ({ branch }: MapCardProps) => {
    const fullAddress = `${branch.address.street}, ${branch.address.extNumber}${branch.address.intNumber ? ` Int. ${branch.address.intNumber}` : ''}, ${branch.address.neighborhood}, CP ${branch.address.zipCode}, ${branch.address.city}`;

    return (
        <aside className="w-full">
            <div
                className="overflow-hidden rounded-3xl border border-gray-100 bg-white shadow-sm ring-1 ring-black/5"
            >
                <div className="border-b border-gray-100 p-6 bg-gray-50/50">
                    <p className="text-xs font-bold uppercase tracking-wider text-gray-400">Detalles de Sucursal</p>
                    <h3
                        className="mt-2 text-2xl font-extrabold text-gray-900"
                    >
                        {branch.name}
                    </h3>
                    <p className="mt-2 text-sm text-gray-600 leading-relaxed font-medium">
                        {fullAddress}
                    </p>
                    {branch.address.references && (
                        <p className="mt-2 text-xs text-gray-500 italic bg-white/50 p-2 rounded-lg border border-gray-100">
                            Ref: {branch.address.references}
                        </p>
                    )}

                    <div className="mt-5 flex flex-wrap gap-3">
                        <a
                            className="inline-flex items-center justify-center rounded-2xl bg-green-600 px-5 py-2.5 text-xs font-extrabold text-white transition-all hover:bg-green-700 shadow-sm"
                            href={branch.urlResults}
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            Consultar resultados
                        </a>

                        <a
                            className="inline-flex items-center justify-center rounded-2xl bg-white px-5 py-2.5 text-xs font-extrabold text-gray-900 ring-1 ring-gray-200 transition-all hover:bg-gray-50"
                            href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(fullAddress)}`}
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            Abrir en Google Maps
                        </a>
                    </div>
                </div>

                <div className="p-4">
                    <div
                        className="overflow-hidden rounded-2xl bg-gray-100 ring-1 ring-gray-200 shadow-inner"
                    >
                        {branch.mapUrl ? (
                            <iframe
                                className="h-[400px] w-full"
                                src={branch.mapUrl}
                                loading="lazy"
                                referrerPolicy="no-referrer-when-downgrade"
                                allowFullScreen
                                title={`Mapa ${branch.name}`}
                            />
                        ) : (
                            <div
                                className="flex min-h-[400px] flex-col items-center justify-center p-8 text-center bg-gray-50"
                            >
                                <div className="rounded-full bg-gray-100 p-4 mb-4">
                                    <svg className="h-8 w-8 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                    </svg>
                                </div>
                                <p className="text-lg font-bold text-gray-900">Mapa no disponible</p>
                                <p className="mt-2 text-sm text-gray-500 max-w-[240px]">
                                    No pudimos cargar el mapa interactivo, pero puedes ver la ubicación directamente en Google Maps.
                                </p>
                                <a
                                    className="mt-6 inline-flex items-center justify-center rounded-2xl bg-white px-6 py-3 text-sm font-extrabold text-gray-900 ring-1 ring-gray-200 transition-all hover:bg-gray-50 shadow-sm"
                                    href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(fullAddress)}`}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    Ir a Google Maps
                                </a>
                            </div>
                        )}
                    </div>

                    <div
                        className="mt-5 grid gap-4 rounded-2xl bg-gradient-to-br from-green-50 to-white p-5 ring-1 ring-green-100 shadow-sm"
                    >
                        <p className="text-xs font-extrabold uppercase tracking-widest text-green-800">Información de Contacto</p>
                        <div className="grid gap-3 text-sm">
                            <div className="flex items-center gap-3 text-gray-700">
                                <div className="rounded-full bg-green-100 p-1.5 text-green-700">
                                    <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                                    </svg>
                                </div>
                                <span className="font-bold">Tel:</span>
                                <span className="font-medium">{branch.phone}</span>
                            </div>
                            <div className="flex items-center gap-3 text-gray-700">
                                <div className="rounded-full bg-green-100 p-1.5 text-green-700">
                                    <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
                                        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.414 0 .018 5.394 0 12.03c0 2.122.554 4.197 1.606 6.034l-1.706 6.234 6.377-1.673a11.777 11.777 0 005.746 1.493h.005c6.634 0 12.032-5.395 12.035-12.032a11.761 11.761 0 00-3.466-8.508z"/>
                                    </svg>
                                </div>
                                <span className="font-bold">WhatsApp:</span>
                                <span className="font-medium">{branch.phone}</span>
                            </div>
                            <div className="flex items-center gap-3 text-gray-700">
                                <div className="rounded-full bg-green-100 p-1.5 text-green-700">
                                    <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                    </svg>
                                </div>
                                <span className="font-bold text-xs uppercase tracking-tight text-gray-400">Email:</span>
                                <span className="font-medium truncate">{branch.email}</span>
                            </div>
                        </div>

                        <div className="grid grid-cols-2 gap-3 mt-2">
                            <a
                                href={`https://wa.me/${branch.phone.replace(/\D/g, '')}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center justify-center gap-2 rounded-2xl bg-green-600 px-4 py-3 text-xs font-extrabold text-white hover:bg-green-700 transition-all shadow-sm"
                            >
                                WhatsApp
                            </a>
                            <a
                                href={`tel:${branch.phone.replace(/\D/g, '')}`}
                                className="inline-flex items-center justify-center gap-2 rounded-2xl bg-white px-4 py-3 text-xs font-extrabold text-gray-900 ring-1 ring-gray-200 hover:bg-gray-50 transition-all shadow-sm"
                            >
                                Llamar
                            </a>
                        </div>
                    </div>
                </div>
            </div>
            
            <div className="mt-4 flex items-center gap-2 px-2 text-gray-400">
                <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <p className="text-[10px] font-medium leading-tight">
                    La visualización del mapa depende de la disponibilidad de Google Maps. 
                    Si no carga, usa el botón "Abrir en Google Maps".
                </p>
            </div>
        </aside>
    )
}

export default MapCard
