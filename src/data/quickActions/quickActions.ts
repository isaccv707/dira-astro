interface QuickActions {
  icon: string;
  text: string;
  description: string;
  path: string;
  accent: "green-primary" | "yellow-primary";
  disabled?: boolean;
  isWhatsapp?: boolean;
}

export const quickActions: QuickActions[] = [
  {
    icon: "lucide:calendar-check",
    text: "Agenda tu cita",
    description: "Vía WhatsApp, respuesta inmediata",
    path: "https://wa.me/3318622542",
    isWhatsapp: true,
    accent: "green-primary",
  },
  {
    icon: "tabler:cash-banknote",
    text: "Cotizador",
    description: "Consulta precios al instante",
    path: "/quoter",
    accent: "yellow-primary",
  },
];
