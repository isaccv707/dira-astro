interface QuickActions {
  icon: string;
  text: string;
  path: string;
  bgColor: string;
  disabled?: boolean;
}

export const quickActions: QuickActions[] = [
  {
    icon: "lucide:calendar-check",
    text: "Agenda tu cita",
    path: "https://wa.me/3318622542",
    bgColor: "bg-green-primary",
  },
  {
    icon: "tabler:cash-banknote",
    text: "Cotizador",
    path: "/quoter",
    bgColor: "bg-yellow-primary",
  },
];
