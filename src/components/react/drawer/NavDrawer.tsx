import Accordion from "../accordion/Accordion";
import NavigationAccordion from "../accordion/NavigationAccordion";
import NavLinkButton from "../ui/NavLinkButton";
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
              // onClick={() => close(id)}
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

        <nav className="mt-auto flex gap-4 pt-8">
          <a href="#" aria-label="Facebook">
            <img src={facebook.src} alt="Facebook" className="w-8 h-8" />
          </a>

          <a href="#" aria-label="Instagram">
            <img src={instagram.src} alt="Instagram" className="w-8 h-8" />
          </a>

          <a href="#" aria-label="WhatsApp">
            <img src={whatsapp.src} alt="WhatsApp" className="w-8 h-8" />
          </a>
        </nav>
      </div>
    </Drawer>
  ) : null;
};

export default NavDrawer;
