export interface Routes {
    path: string;
    text: string;
}


export const routes: Routes[] = [
    { path: '/', text: 'Inicio' },
    { path: '/about', text: 'Acerca de Nosotros' },
    { path: '/services', text: 'Servicios' },
    { path: '/contact', text: 'Contacto' }
]
