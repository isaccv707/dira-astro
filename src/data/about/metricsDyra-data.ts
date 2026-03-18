

interface MetricsDyra {
    label: string;
    value: string | number;
    suffix?: string;
    description: string;
}

export const METRICSDYRA: MetricsDyra[] = [
    {
        label: "Años de experiencia",
        value: 15,
        suffix: "",
        description: "Respaldando médicos, empresas y pacientes con resultados confiables.",
    },
    {
        label: "Pruebas al año",
        value: 100000,
        suffix: "+",
        description: "Capacidad operativa con flujos automatizados y trazabilidad completa.",
    },
    {
        label: "Tecnología",
        value: 24,
        suffix: "/7",
        description: "Equipos de laboratorio de alta complejidad y monitoreo continuo.",
    },
];