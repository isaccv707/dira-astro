
import { Analisys } from '../products/products-analisys-data';
import type { Service } from '../../interfaces/service.interface';
import { addressIcon, healthIcon, testTubes } from '../../assets/icons';
import {
    analysis45Image,
    businessHealth45Image,
    homeShots45IMage,
    analysis167Image,
    businessHealth167Image,
    homeShots167IMage
} from '../../assets/images/services';


export const services: Service[] = [
    {
        id: 'analisis-clinicos',
        title: 'Analisis Clinicos',
        icon: testTubes,
        img: {
            image45: analysis45Image,
            image167: analysis167Image
        },
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
        img: {
            image45: businessHealth45Image,
            image167: businessHealth167Image
        },
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
        img: {
            image45: homeShots45IMage,
            image167: homeShots167IMage
        },
        description: 'Servicio de toma de muestras a domicilio con personal capacitado y turnos programados para tu comodidad.',
        path: 'service',
        products: [],
        category: 'Domicilio',
        tags: ['domicilio', 'comodidad']
    },
]