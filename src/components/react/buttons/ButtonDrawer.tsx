import { Menu } from "lucide-react";
import { openDrawer } from "../../../stores/drawerStore";

const ButtonDrawer = () => {
  const handleDrawer = () => {
    openDrawer("DRAWER_NAVBAR", { title: "Menú" });
  };

  return (
    <button
      type="button"
      onClick={handleDrawer}
      aria-label="Abrir menú"
      aria-haspopup="dialog"
      className="flex h-10 w-10 items-center justify-center rounded-clinical-sm text-ink transition-colors duration-200 hover:bg-green-primary/8 hover:text-brand-ink focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-green-primary"
    >
      <Menu aria-hidden="true" className="h-6 w-6" />
    </button>
  );
};

export default ButtonDrawer;
