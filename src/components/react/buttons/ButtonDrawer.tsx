import Button from "./Button";
import { openDrawer } from "../../../stores/drawerStore";

const ButtonDrawer = () => {
  const handleDrawer = () => {
    openDrawer("DRAWER_NAVBAR", {
      title: "Menu",
    });
  };
  return <Button onClick={handleDrawer} icon={"tabler:menu-2-filled"} />;
};

export default ButtonDrawer;
