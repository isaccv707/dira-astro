export interface Routes {
    path: string;
    text: string;
}


const routes: Routes[] = [
    { path: '/', text: 'Inicio' },
    { path: '/blog', text: 'Blog' }
]

const servicesRoutes: Routes[] = [
    { path: '/service/analisis-clinicos', text: 'Análisis Clínicos' },
    { path: '/service/salud-empresarial', text: 'Salud Empresarial' },
    { path: '/service/tomas-domicilio', text: 'Tomas a Domicilio' },
    { path: '/service/biologia-molecular', text: 'Biología Molecular' },
]
const resultsRoutes: Routes[] = [
    { path: 'https://s26.cogniti.com.mx/dyraJalisco_consultaweb/Comun/Login.aspx', text: 'Guadalajara' },
    { path: 'https://s26.cogniti.com.mx/dira_consultaweb/Comun/Login.aspx', text: 'Colima' },
]

const getToKnowRoutes: Routes[] = [
    { path: '/about', text: 'Conócenos' },
    { path: '/contact', text: 'Contáctanos' },
    { path: '/branchs', text: 'Nuestras Sucursales' },
]

export {
    routes,
    servicesRoutes,
    resultsRoutes,
    getToKnowRoutes
}


