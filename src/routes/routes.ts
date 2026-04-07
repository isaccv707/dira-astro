export interface Routes {
  path: string;
  text: string;
}

const routes: Routes[] = [{ path: "/", text: "Inicio" }];

const servicesRoutes: Routes[] = [
  { path: "/service/analisis-clinicos", text: "Análisis Clínicos" },
  { path: "/service/salud-empresarial", text: "Salud Empresarial" },
  { path: "/service/tomas-a-domicilio", text: "Tomas a Domicilio" },
];
const resultsRoutes: Routes[] = [
  {
    path: "https://s26.cogniti.com.mx/dyraJalisco_consultaweb/Comun/Login.aspx",
    text: "Guadalajara",
  },
  {
    path: "https://s26.cogniti.com.mx/dira_consultaweb/Comun/Login.aspx",
    text: "Colima",
  },
];

const getToKnowRoutes: Routes[] = [
  { path: "/about", text: "Conócenos" },
  { path: "/contact", text: "Contáctanos" },
  { path: "/branches", text: "Nuestras Sucursales" },
];

export { routes, servicesRoutes, resultsRoutes, getToKnowRoutes };
