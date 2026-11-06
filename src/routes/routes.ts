export interface Routes {
  path: string;
  text: string;
}

// Primary navigation, ordered by what patients come to do. The logo links
// home, so "Inicio" is not repeated here.
const routes: Routes[] = [
  { path: "/quoter", text: "Cotizador" },
  { path: "/branches", text: "Sucursales" },
  { path: "/blog", text: "Blog" },
];

const getToKnowRoutes: Routes[] = [
  { path: "/about", text: "Quiénes somos" },
  { path: "/contact", text: "Contacto" },
];

/** True when `path` is the current page or a section that contains it. */
const isActivePath = (current: string, path: string): boolean => {
  if (path === "/") return current === "/";
  const normalized = current.replace(/\/$/, "") || "/";
  return normalized === path || normalized.startsWith(`${path}/`);
};

export { routes, getToKnowRoutes, isActivePath };
