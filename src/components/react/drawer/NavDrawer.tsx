import clsx from "clsx";
import { useStore } from "@nanostores/react";
import { ExternalLink } from "lucide-react";

import NavLinkButton from "../navigation/NavLinkButton";
import {
  getToKnowRoutes,
  isActivePath,
  routes,
  type Routes,
} from "../../../routes/routes";
import { closeDrawer, drawerStore } from "../../../stores/drawerStore";
import Drawer from "./Drawer";
import { buildSocialNetworks } from "../../../constants/socialNetworks";
import { useActiveBranchContact } from "../../../hooks/useActiveBranchContact";

interface NavDrawerProps {
  services: Routes[];
  resultsUrl: string;
  id?: string;
  title?: string;
}

const NavGroup = ({
  label,
  items,
  currentPath,
}: {
  label: string;
  items: Routes[];
  currentPath: string;
}) => (
  <div>
    <p className="px-3 text-2xs font-semibold uppercase tracking-wide text-ink-subtle">
      {label}
    </p>
    <ul className="mt-1">
      {items.map(({ path, text }) => {
        const isActive = isActivePath(currentPath, path);
        return (
          <li key={path}>
            <a
              href={path}
              aria-current={isActive ? "page" : undefined}
              className={clsx(
                "flex min-h-11 items-center rounded-clinical-sm px-3 text-base transition-colors duration-150 hover:bg-green-primary/8 hover:text-brand-ink focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-green-primary",
                isActive ? "bg-green-primary/8 font-semibold text-brand-ink" : "text-ink",
              )}
            >
              {text}
            </a>
          </li>
        );
      })}
    </ul>
  </div>
);

export const NavDrawer = ({
  services,
  resultsUrl,
  id = "DRAWER_NAVBAR",
  title = "Menú",
}: NavDrawerProps) => {
  const { isOpen, view } = useStore(drawerStore);
  const contact = useActiveBranchContact();
  const socialNetworks = buildSocialNetworks(contact);

  if (!isOpen || view !== id) return null;

  const currentPath = window.location.pathname;
  const resultsIsExternal = resultsUrl.startsWith("http");

  return (
    <Drawer id={id} onClose={closeDrawer} title={title} open={isOpen}>
      <div className="flex h-full min-h-[80vh] flex-col">
        <nav aria-label="Menú principal" className="mt-4 flex flex-col gap-6">
          <NavGroup
            label="Laboratorio"
            items={[{ path: "/", text: "Inicio" }, ...routes]}
            currentPath={currentPath}
          />
          {services.length > 0 && (
            <NavGroup label="Servicios" items={services} currentPath={currentPath} />
          )}
          <NavGroup label="Nosotros" items={getToKnowRoutes} currentPath={currentPath} />
        </nav>

        <div className="mt-auto flex flex-col gap-4 border-t border-ui-border pt-6">
          <NavLinkButton
            path={resultsUrl}
            variant="primary"
            size="lg"
            width="full"
            target={resultsIsExternal ? "_blank" : "_self"}
          >
            Consultar resultados
            {resultsIsExternal && (
              <ExternalLink aria-hidden="true" className="h-4 w-4" />
            )}
          </NavLinkButton>

          <ul className="flex items-center gap-2">
            {socialNetworks.map(({ icon, name, route }) => (
              <li key={name}>
                <NavLinkButton
                  path={route}
                  icon={icon}
                  iconClassName="h-6 w-6"
                  variant="icon"
                  size="icon"
                  className="h-11 w-11 hover:bg-ui-bg"
                  target={name === "Gmail" ? "_self" : "_blank"}
                  ariaLabel={name === "Gmail" ? "Enviar correo" : name}
                />
              </li>
            ))}
          </ul>
        </div>
      </div>
    </Drawer>
  );
};
