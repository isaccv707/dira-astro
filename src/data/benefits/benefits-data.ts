interface BenefitCardProps {
  icon: string;
  title: string;
  description: string;
}

export const benefits: BenefitCardProps[] = [
  {
    icon: "lucide:test-tube-diagonal",
    title: "Resultados Rápidos",
    description:
      "Obtén tus resultados en tiempo récord sin sacrificar precisión.",
  },
  {
    icon: "lucide:microscope",
    title: "Alta Precisión",
    description:
      "Tecnología avanzada y controles estrictos para resultados confiables.",
  },
  {
    icon: "lucide:user-star",
    title: "Equipo Profesional",
    description:
      "Especialistas altamente capacitados en cada área de análisis.",
  },
  {
    icon: "lucide:house-heart",
    title: "A Domicilio",
    description: "Tomas de muestras directamente en tu casa o empresa.",
  },
];
