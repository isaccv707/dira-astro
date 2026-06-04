import { useStore } from "@nanostores/react";
import { drawerStore } from "../../../stores/drawerStore";
import DrawerCart from "./DrawerCart";
import { NavDrawer } from "./NavDrawer";

const DrawerManager = () => {
  const { isOpen, view } = useStore(drawerStore);
  if (!isOpen) return null;

  switch (view) {
    case "DRAWER_STUDIES":
      return <DrawerCart />;
    case "DRAWER_NAVBAR":
      return <NavDrawer />;
    default:
      return null;
  }
};

export default DrawerManager;
