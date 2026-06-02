import { Menu } from "lucide-react";
import { useStore } from "@nanostores/react";
import Button from "./Button";
import { isDrawerOpen } from "../../../stores/drawerStore";

const ButtonDrawer = () => {
  const $isDrawerOpen = useStore(isDrawerOpen);

  const handleDrawer = () => {
    isDrawerOpen.set(!$isDrawerOpen);
  };

  return <Button onClick={handleDrawer} icon={<Menu />} />;
};

export default ButtonDrawer;
