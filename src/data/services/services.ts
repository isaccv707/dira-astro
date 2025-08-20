import image from '../../assets/images/image.png';
import { TestTubes, HeartPlus, House, Microscope, type LucideProps } from 'lucide-react';

interface Service {
    id: string;
    title: string;
    image: ImageMetadata;
    Icon?: React.ForwardRefExoticComponent<Omit<LucideProps, "ref"> & React.RefAttributes<SVGSVGElement>>
    text: string;
    textButton: string;
    path: string;
}

export const services: Service[] = [
    {
        id: 'analisis-clinicos',
        title: 'Analisis Clinicos',
        Icon: TestTubes,
        image: image,
        text: 'Lorem, ipsum dolor sit amet consectetur adipisicing elit.',
        textButton: 'Mas informacion',
        path: 'service',
    },
    {
        id: 'salud-empresarial',
        title: 'Salud Empresarial',
        Icon: HeartPlus,
        image: image,
        text: 'Lorem, ipsum dolor sit amet consectetur adipisicing elit.',
        textButton: 'Mas informacion',
        path: 'service'
    },
    {
        id: 'tomas-domicilio',
        title: 'Tomas a domicilio',
        Icon: House,
        image: image,
        text: 'Lorem, ipsum dolor sit amet consectetur adipisicing elit.',
        textButton: 'Mas informacion',
        path: 'service'
    },
    {
        id: 'biologia-molecular',
        title: 'Biologia Molecular',
        Icon: Microscope,
        image: image,
        text: 'Lorem, ipsum dolor sit amet consectetur adipisicing elit.',
        textButton: 'Mas informacion',
        path: 'service'
    }
]