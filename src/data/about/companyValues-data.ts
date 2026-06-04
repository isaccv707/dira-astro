interface ListCompanyValues {
  title: string;
  text?: string;
}

interface CompanyValues {
  title: string;
  paragraph?: string;
  icon: string;
  bgColor?: string;
  list?: ListCompanyValues[];
}

export const companyValues: CompanyValues[] = [
  {
    title: "Misión",
    paragraph: `Proveer soluciones de referencia diagnóstica con los más altos estándares de precisión, 
    integrando tecnología de vanguardia, excelencia analítica y procesos clínicos estandarizados, 
    para respaldar decisiones médicas oportunas, fortalecer la práctica clínica y generar bienestar 
    sostenible en pacientes y organizaciones.`,
    bgColor: "green-primary",
    icon: "lucide:rocket",
  },
  {
    title: "Visión",
    paragraph: `Consolidarnos como el laboratorio clínico de referencia en diagnóstico especializado, reconocido por su confiabilidad, innovación continua y excelencia operativa, siendo un socio estratégico en la gestión de la salud y un generador de valor tangible para el sector médico y empresarial.`,
    bgColor: "green-secondary",
    icon: "lucide:telescope",
  },
  {
    title: "Valores",
    bgColor: "yellow-primary",
    list: [
      {
        title: "Precisión y Referencia Diagnóstica",
        text: "Compromiso absoluto con la exactitud de los resultados, sustentado en procesos analíticos robustos, validación técnica y estándares de calidad superiores.",
      },
      {
        title: "Empatía Proactiva",
        text: "Entendemos las necesidades clínicas y operativas de nuestros clientes, anticipándonos con soluciones oportunas, cercanas y orientadas al servicio.",
      },
      {
        title: "Transparencia Ética",
        text: "Actuamos con integridad, claridad y responsabilidad en cada proceso, fortaleciendo la confianza con médicos, pacientes y aliados.",
      },
      {
        title: "Innovación Aplicada",
        text: "Incorporamos tecnología y mejora continua de manera estratégica para optimizar resultados, ampliar capacidades diagnósticas y generar ventaja competitiva.",
      },
    ],
    icon: "lucide:shield-check",
  },
];
