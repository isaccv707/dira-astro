export interface Routes {
    path: string;
    text: string;
}


export const routes: Routes[] = [
    { path: '/', text: 'Inicio' },
    { path: '/resultados', text: 'Resultados' },
    { path: '/blog', text: 'Blog' }
]

export const servicesRoutes: Routes[] = [
    {path: '/service/analisis-clinicos', text: 'Analisis Clinicos'},
    {path: '/service/salud-empresarial', text: 'Salud Empresarial'},
    {path: '/service/tomas-domicilio', text: 'Tomas a Domicilio'},
    {path: '/service/biologia-molecular', text: 'Biologia Molecular'},
]

export const getToKnowRoutes: Routes[] = [
    {path: '/about', text: 'Conócenos'},
    {path: '/contact', text: 'Contáctanos'},
    {path: '/branchs', text: 'Nuestras Sucursales'},
]
