export interface Routes {
    path: string;
    text: string;
    options?: string[];
}


export const routes: Routes[] = [
    { path: '/', text: 'Inicio' },
    // { path: '/appointment', text: 'Agendar cita' },
    { path: '/resultados', text: 'Resultados' },
    { path: '/blog', text: 'Blog' }
]
