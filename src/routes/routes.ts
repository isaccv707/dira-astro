export interface Routes {
  path: string;
  text: string;
}

const routes: Routes[] = [
  { path: "/", text: "Inicio" },
  { path: "/blog", text: "Blog" },
];

const getToKnowRoutes: Routes[] = [
  { path: "/about", text: "Conócenos" },
  { path: "/contact", text: "Contáctanos" },
  { path: "/branches", text: "Nuestras Sucursales" },
];

export { routes, getToKnowRoutes };
