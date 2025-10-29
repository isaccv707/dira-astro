
import {testTube, microscope,teamWork, address} from '../../assets/icons/benefits-icons';

interface BenefitCardProps {
    icon: ImageMetadata;
    title: string;
    description: string;
}

export const benefits: BenefitCardProps[] = [
    {
        icon: testTube,
        title: 'Resultados Rápidos',
        description: 'Obtén tus resultados en tiempo récord sin sacrificar precisión.'
    },
    {
        icon: microscope,
        title: 'Alta Precisión',
        description: 'Tecnología avanzada y controles estrictos para resultados confiables.'
    },
    {
        icon: teamWork,
        title: 'Equipo Profesional',
        description: 'Especialistas altamente capacitados en cada área de análisis.',
    },
    {
        icon: address,
        title: 'A Domicilio',
        description: 'Tomas de muestras directamente en tu casa o empresa.',
    }
]