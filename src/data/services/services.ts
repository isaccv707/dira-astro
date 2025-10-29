import { Analisys } from '../products/products-analisys-data';
import type { Service } from '../../interfaces/service.interface';
import { addressIcon, healthIcon, microscopeIcon, testTubes } from '../../assets/icons';


export const services: Service[] = [
    {
        id: 'analisis-clinicos',
        title: 'Analisis Clinicos',
        icon: testTubes,
        description: 'Lorem, ipsum dolor sit amet consectetur adipisicing elit.',
        textButton: 'Mas informacion',
        path: 'service',
        products: Analisys,
    },
    {
        id: 'salud-empresarial',
        title: 'Salud Empresarial',
        icon: healthIcon,
        description: 'Lorem, ipsum dolor sit amet consectetur adipisicing elit.',
        textButton: 'Mas informacion',
        path: 'service',
        products: []
    },
    {
        id: 'tomas-domicilio',
        title: 'Tomas a domicilio',
        icon: addressIcon,
        description: 'Lorem, ipsum dolor sit amet consectetur adipisicing elit.',
        textButton: 'Mas informacion',
        path: 'service',
        products: []
    },
    {
        id: 'biologia-molecular',
        title: 'Biologia Molecular',
        icon: microscopeIcon,
        description: 'Lorem, ipsum dolor sit amet consectetur adipisicing elit.',
        textButton: 'Mas informacion',
        path: 'service',
        products: []
    }
]