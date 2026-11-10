import { useStore } from "@nanostores/react";
import { drawerStore } from "../../../stores/drawerStore";
import type { Routes } from "../../../routes/routes";
import DrawerCart from "./DrawerCart";
import { NavDrawer } from "./NavDrawer";

interface DrawerManagerProps {
  services: Routes[];
  resultsUrl: string;
}

const DrawerManager = ({ services, resultsUrl }: DrawerManagerProps) => {
  const { isOpen, view } = useStore(drawerStore);
  if (!isOpen) return null;

  switch (view) {
    case "DRAWER_STUDIES":
      return <DrawerCart />;
    case "DRAWER_NAVBAR":
      return <NavDrawer services={services} resultsUrl={resultsUrl} />;
    default:
      return null;
  }
};

export default DrawerManager;
