import Accordion from "../accordion/Accordion";
import NavigationAccordion from "../accordion/NavigationAccordion";
import NavLinkButton from "../navigation/NavLinkButton";
import {
  getToKnowRoutes,
  routes,
  servicesRoutes,
} from "../../../routes/routes";
import { closeDrawer, drawerStore } from "../../../stores/drawerStore";
import Drawer from "./Drawer";
import { SOCIAL_NETWORKS } from "../../../constants/socialNetworks";
import { useStore } from "@nanostores/react";

interface NavDrawerProps {
  id?: string;
  title?: string;
}

export const NavDrawer = ({
  id = "DRAWER_NAVBAR",
  title = "Menu",
}: NavDrawerProps) => {
  const { isOpen, view } = useStore(drawerStore);

  if (!isOpen || view !== id) return null;

  return (
    <Drawer id={id} onClose={closeDrawer} title={title} open={isOpen}>
      <div className="flex min-h-[85vh] md:min-h-[80vh] h-full flex-col justify-between">
        <nav className="mt-6 flex flex-col gap-6 items-stretch text-left">
          {routes.map(({ path, text }: { path: string; text: string }) => (
            <NavLinkButton
              key={path}
              path={path}
              text={text}
              variant={"primary"}
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

        <div className="mt-auto pt-10 flex flex-col gap-4 border-t border-gray-100 dark:border-gray-800">
          {/* Redes Sociales */}
          <nav className="flex gap-4 items-center">
            {SOCIAL_NETWORKS.map(({ icon, name, route }) => (
              <NavLinkButton
                key={name}
                path={route}
                icon={icon}
                iconClassName="w-7 h-7"
                variant="icon"
                size="icon"
                ariaLabel={name}
              />
            ))}
          </nav>

          {/* Texto de Copyright */}
          <p className="text-xs text-gray-400 dark:text-gray-500 font-medium tracking-wide">
            © {new Date().getFullYear()} dyranalitica. Todos los derechos
            reservados.
          </p>
        </div>
      </div>
    </Drawer>
  );
};
