import React from 'react'
const MetricsDyra = () => {
    const stats = [
        {
            label: "Años de experiencia",
            initial: 0,
            value: 15,
            description:
                "Respaldando médicos, empresas y pacientes con resultados confiables.",
        },
        {
            label: "Pruebas procesadas al año",
            initial: 0,
            value: 120,
            description:
                "Capacidad operativa con flujos automatizados y trazabilidad completa.",
        },
        {
            label: "Tecnología instalada",
            value: "24/7",
            description:
                "Equipos de laboratorio de alta complejidad y monitoreo continuo.",
        },
    ];
    return (
        <div
            className="grid gap-6 rounded-3xl border border-white/10 bg-green-secondary p-6 shadow-xl shadow-black/60 sm:grid-cols-3 sm:p-8"
        >
            {
                stats.map((item) => (
                    <div className="space-y-1 border-green-primary sm:border-l sm:first:border-none sm:pl-6 first:pl-0">
                        <p className="text-2xl font-extrabold tracking-tight text-green-primary sm:text-3xl">
                            {item.value}
                        </p>
                        <p className="text-xs font-bold uppercase tracking-[0.2em] text-yellow-primary">
                            {item.label}
                        </p>
                        <p className="text-xs text-white sm:text-sm">
                            {item.description}
                        </p>
                    </div>
                ))
            }
        </div>
    )
}

export default MetricsDyra
