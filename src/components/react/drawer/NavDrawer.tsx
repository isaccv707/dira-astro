import Accordion from "../accordion/Accordion";
import NavigationAccordion from "../accordion/NavigationAccordion";
import NavLinkButton from "../navigation/NavLinkButton";
import {
  facebook,
  instagram,
  whatsapp,
} from "../../../assets/icons/networks-icons";
import {
  getToKnowRoutes,
  routes,
  servicesRoutes,
} from "../../../routes/routes";
import { useStore } from "@nanostores/react";
import { isDrawerOpen } from "../../../stores/drawerStore";
import Drawer from "./Drawer";
import { SOCIAL_NETWORKS } from "../../../constants/socialNetworks";
import ButtonNetworkIcons from "../ui/ButtonNetworkIcons";

interface NavDrawerProps {
  id?: string;
  data?: any;
  title?: string;
}

const NavDrawer = () => {
  const $isDrawerOpen = useStore(isDrawerOpen);

  const handleCloseDrawer = () => {
    isDrawerOpen.set(!$isDrawerOpen);
  };

  return $isDrawerOpen ? (
    <Drawer onClose={handleCloseDrawer} title="Menu" open={true}>
      <div className="flex h-full flex-col">
        <nav className="mt-10 flex flex-col gap-6 items-stretch text-left">
          {routes.map(({ path, text }: { path: string; text: string }) => (
            <NavLinkButton
              key={path}
              path={path}
              text={text}
              variant={"normal"}
              align={"left"}
              width={"full"}
            />
          ))}

          <Accordion id={"services"} title={"Servicios"}>
            <NavigationAccordion routes={servicesRoutes} />
          </Accordion>

          <Accordion id={"our"} title={"Conócenos"}>
            <NavigationAccordion routes={getToKnowRoutes} />
          </Accordion>
        </nav>

        <nav className="mb-0 flex gap-4 pt-8">
          {SOCIAL_NETWORKS.map(({ icon, name, route }) => (
            <ButtonNetworkIcons icon={icon} name={name} route={route} />
          ))}
        </nav>
      </div>
    </Drawer>
  ) : null;
};

export default NavDrawer;
