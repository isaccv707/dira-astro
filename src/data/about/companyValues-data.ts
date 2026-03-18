import { missionIcon, valuesIcon, visionIcon } from '../../assets/icons/companyValues-icons'

interface CompanyValues {
    title: string;
    paragraph: string;
    icon?: ImageMetadata;
    bgColor?: string
}

export const companyValues: CompanyValues[] = [
    {
        title: 'Misión',
        paragraph: `Brindar servicios de laboratorio con altos estándares de
                calidad, apoyando el diagnóstico oportuno y la prevención de
                enfermedades, con un enfoque cálido y cercano.`,
        bgColor: 'green-primary',
        icon: missionIcon
    },
    {
        title: 'Visión',
        paragraph: `Ser el laboratorio de referencia en la región por nuestra
                precisión, innovación tecnológica y calidad humana en cada
                contacto con el paciente.`,
        bgColor: 'green-secondary',
        icon: visionIcon
    },
    {
        title: 'Valores',
        paragraph: `Nos regimos por la integridad, la precisión técnica y la confidencialidad. 
                Nuestro compromiso es la mejora continua y el trato humano, garantizando 
                resultados confiables para la tranquilidad de nuestros pacientes.`,
        bgColor: 'yellow-primary',
        icon: valuesIcon
    },
]