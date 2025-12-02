import { Analisys } from '../products/products-analisys-data';
import type { Service } from '../../interfaces/service.interface';
import { addressIcon, healthIcon, microscopeIcon, testTubes } from '../../assets/icons';


export const services: Service[] = [
    {
        id: 'analisis-clinicos',
        title: 'Analisis Clinicos',
        icon: testTubes,
        description: 'Analizamos muestras clínicas con equipos de última generación y protocolos estandarizados para asegurar resultados precisos y confiables.',
        path: 'service',
        products: Analisys,
        category: 'Laboratorio',
        benefits: [
            { icon: '', title: 'Profesionalismo', text: 'Contamos con personal altamente capacitado para ofrecerte el mejor servicio.' },
            { icon: '', title: 'Tecnología avanzada', text: 'Usamos equipos modernos para garantizar resultados exactos y rápidos.' },
            { icon: '', title: 'Atención personalizada', text: 'Nos adaptamos a tus necesidades con trato humano y eficiente.' },
        ],
        tags: ['analisis', 'muestras', 'laboratorio']
    },
    {
        id: 'salud-empresarial',
        title: 'Salud Empresarial',
        icon: healthIcon,
        description: 'Programas integrales de salud laboral: tamizajes, campañas preventivas y asesoría para mantener tu equipo saludable y productivo.',
        path: 'service',
        products: [],
        category: 'Empresa',
        tags: ['empresa', 'prevencion']
    },
    {
        id: 'tomas-domicilio',
        title: 'Tomas a domicilio',
        icon: addressIcon,
        description: 'Servicio de toma de muestras a domicilio con personal capacitado y turnos programados para tu comodidad.',
        path: 'service',
        products: [],
        category: 'Domicilio',
        tags: ['domicilio', 'comodidad']
    },
    {
        id: 'biologia-molecular',
        title: 'Biologia Molecular',
        icon: microscopeIcon,
        description: 'Servicios de biología molecular con pruebas de alta sensibilidad y control de calidad para detección confiable.',
        path: 'service',
        products: [],
        category: 'Laboratorio',
        tags: ['molecular', 'PCR']
    }
]