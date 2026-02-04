import type { Post } from "../../interfaces/blog.interface"
import { doc1M, doc2M, qfb1M, qfb2H } from "../../assets/images/blog"

export const posts: Post[] = [
    {
        id: "post-001",
        title: "¿Qué es una biometría hemática y para qué sirve?",
        slug: "que-es-biometria-hematica",
        author: {
            name: "Dra. Fernanda Ruiz",
            avatar: doc1M,
        },
        description:
            "Una guía clara sobre la biometría hemática: qué mide, cuándo se solicita y cómo interpretar resultados generales.",
        date: "2025-12-10",
        updatedAt: "2025-12-18",
        tags: ["hematología", "biometría hemática", "salud"],
        category: "Hematología",
        excerpt:
            "La biometría hemática es uno de los estudios más solicitados porque ofrece una visión general del estado de la sangre y puede orientar diagnósticos comunes.",
        image: undefined, // si usas Astro ImageMetadata, aquí puedes poner: someImageImport
        readingTime: 6,
        metaDescription:
            "Aprende qué es una biometría hemática, qué valores evalúa y cuándo se recomienda. Guía práctica para pacientes.",
        status: "published",
        content: [
            {
                type: "paragraph",
                content:
                    "La biometría hemática (BH) es un análisis de sangre que evalúa componentes como glóbulos rojos, glóbulos blancos y plaquetas. Se utiliza para detectar anemia, infecciones, inflamación y otras alteraciones.",
            },
            {
                type: "subtitle",
                content: "¿Qué evalúa una biometría hemática?",
            },
            {
                type: "list",
                items: [
                    {
                        title: "Glóbulos rojos (eritrocitos)",
                        text: "Relacionados con el transporte de oxígeno. Alteraciones pueden sugerir anemia o deshidratación.",
                    },
                    {
                        title: "Hemoglobina y hematocrito",
                        text: "Indicadores clave para evaluar anemia, sangrados o cambios en el volumen sanguíneo.",
                    },
                    {
                        title: "Glóbulos blancos (leucocitos)",
                        text: "Se elevan o disminuyen por infecciones, estrés, inflamación o problemas de médula ósea.",
                    },
                    {
                        title: "Plaquetas",
                        text: "Participan en la coagulación. Valores fuera de rango se asocian con moretones, sangrados o riesgo de trombosis.",
                    },
                ],
            },
            {
                type: "subtitle",
                content: "¿Cuándo se solicita?",
            },
            {
                type: "paragraph",
                content:
                    "Se pide cuando hay sospecha de infección, cansancio persistente, palidez, fiebre, sangrados anormales o como parte de chequeos generales y preoperatorios.",
            },
            {
                type: "quote",
                content:
                    "Un resultado fuera de rango no siempre significa enfermedad; la interpretación depende de síntomas, historia clínica y otros estudios.",
            },
            {
                type: "paragraph",
                content:
                    "Si tienes dudas, consulta a tu médico para una interpretación completa y personalizada. En el laboratorio podemos orientarte sobre preparación y tiempos de entrega.",
            },
        ],
    },

    {
        id: "post-002",
        title: "Ayuno en estudios de laboratorio: qué sí y qué no",
        slug: "ayuno-estudios-de-laboratorio-que-si-y-que-no",
        author: {
            name: "QFB. Mariana López",
            avatar: qfb1M,
        },
        description:
            "Evita repetir estudios: te explicamos cuándo se necesita ayuno, cuánto tiempo y qué bebidas o hábitos pueden alterar tus resultados.",
        date: "2025-12-05",
        tags: ["preparación", "ayuno", "química clínica"],
        category: "Preparación del paciente",
        excerpt:
            "El ayuno no aplica para todos los estudios. Saber cuándo hacerlo (y cómo) mejora la precisión de tus resultados.",
        image: undefined,
        readingTime: 5,
        metaDescription:
            "Guía de ayuno para análisis de sangre: tiempos recomendados, qué puedes beber y errores frecuentes.",
        status: "published",
        content: [
            {
                type: "paragraph",
                content:
                    "El ayuno es una indicación que busca reducir variaciones en la sangre causadas por alimentos y bebidas. Sin embargo, no todos los estudios requieren ayuno.",
            },
            {
                type: "subtitle",
                content: "Estudios que comúnmente requieren ayuno",
            },
            {
                type: "list",
                items: [
                    { title: "Glucosa", text: "Usualmente 8 a 12 horas de ayuno, según indicación médica." },
                    { title: "Perfil de lípidos", text: "Frecuente 9 a 12 horas para triglicéridos y colesterol." },
                    { title: "Insulina y curva de tolerancia", text: "Ayuno estricto y preparación específica." },
                ],
            },
            {
                type: "subtitle",
                content: "¿Puedo tomar agua?",
            },
            {
                type: "paragraph",
                content:
                    "En general, sí: agua natural. Evita café, té con azúcar, jugos, refrescos, chicles o caramelos. Si tomas medicamentos, sigue la indicación de tu médico.",
            },
            {
                type: "quote",
                content:
                    "Si no estás seguro si tu estudio requiere ayuno, pregúntanos antes de acudir: te evitamos repetir la toma.",
            },
        ],
    },

    {
        id: "post-003",
        title: "Uroanálisis: errores comunes al recolectar la muestra",
        slug: "uroanalisis-errores-comunes-recoleccion",
        author: {
            name: "QFB. David Herrera",
            avatar: qfb2H,
        },
        description:
            "Una muestra bien tomada marca la diferencia. Aprende los errores más frecuentes y cómo evitarlos para obtener resultados confiables.",
        date: "2025-11-22",
        tags: ["uroanálisis", "orina", "muestras"],
        category: "Microbiología",
        excerpt:
            "La mayoría de resultados alterados en uroanálisis se deben a contaminación o mala recolección. Con estos pasos lo puedes evitar.",
        image: undefined,
        readingTime: 6,
        metaDescription:
            "Cómo tomar correctamente una muestra de orina para uroanálisis: pasos, recomendaciones y errores frecuentes.",
        status: "published",
        content: [
            {
                type: "paragraph",
                content:
                    "El uroanálisis evalúa componentes físicos, químicos y microscópicos de la orina. Es útil para detectar infección urinaria, presencia de sangre, glucosa, proteínas, cristales y más.",
            },
            {
                type: "subtitle",
                content: "Pasos recomendados (muestra de chorro medio)",
            },
            {
                type: "list",
                items: [
                    { title: "Higiene previa", text: "Lava manos y realiza limpieza de la zona genital con agua y jabón (sin antisépticos fuertes)." },
                    { title: "Primer chorro al inodoro", text: "Descarta los primeros segundos y recolecta el chorro medio en un frasco estéril." },
                    { title: "Cierre inmediato", text: "Tapa el frasco y evita tocar el interior de la tapa o el borde." },
                    { title: "Entrega pronta", text: "Lleva la muestra lo antes posible (idealmente en 1–2 horas) o refrigera si se indica." },
                ],
            },
            {
                type: "subtitle",
                content: "Errores comunes",
            },
            {
                type: "list",
                items: [
                    { title: "Usar frascos no estériles", text: "Puede contaminar la muestra y simular infección." },
                    { title: "Recolectar durante menstruación", text: "Puede alterar resultados; consulta al laboratorio para indicaciones." },
                    { title: "No descartar el primer chorro", text: "Aumenta el riesgo de contaminación por flora externa." },
                ],
            },
            {
                type: "quote",
                content:
                    "Una muestra bien tomada evita falsos positivos y tratamientos innecesarios.",
            },
        ],
    },

    {
        id: "post-004",
        title: "TSH, T3 y T4: entendiendo tus estudios de tiroides",
        slug: "tsh-t3-t4-entendiendo-estudios-tiroides",
        author: {
            name: "Dra. Andrea Salas",
            avatar: doc2M,
        },
        description:
            "Qué significa cada prueba de tiroides, para qué se solicita y cómo se interpreta en conjunto de forma general.",
        date: "2025-10-30",
        updatedAt: "2025-11-02",
        tags: ["tiroides", "TSH", "hormonas"],
        category: "Endocrinología",
        excerpt:
            "La TSH es la puerta de entrada al estudio tiroideo, pero T3 y T4 completan el panorama para entender síntomas y evolución.",
        image: undefined,
        readingTime: 7,
        metaDescription:
            "Guía general de estudios de tiroides: TSH, T3 y T4, cuándo se solicitan y qué significan.",
        status: "published",
        content: [
            {
                type: "paragraph",
                content:
                    "Los estudios tiroideos ayudan a evaluar si la glándula tiroides está funcionando de forma adecuada. Las pruebas más comunes son TSH, T4 (total o libre) y T3 (total o libre).",
            },
            {
                type: "subtitle",
                content: "¿Qué es la TSH?",
            },
            {
                type: "paragraph",
                content:
                    "La TSH es una hormona producida por la hipófisis que regula la producción de hormonas tiroideas. Suele ser la primera prueba para detectar hipo o hipertiroidismo.",
            },
            {
                type: "subtitle",
                content: "T4 y T3: el complemento",
            },
            {
                type: "list",
                items: [
                    { title: "T4", text: "Hormona principal producida por la tiroides. La fracción libre (T4L) suele ser más útil para interpretar función." },
                    { title: "T3", text: "Hormona más activa. Puede ser útil en sospecha de hipertiroidismo o seguimiento, según el caso." },
                ],
            },
            {
                type: "quote",
                content:
                    "La interpretación depende del contexto: síntomas, medicamentos, embarazo, y antecedentes. No se debe concluir un diagnóstico solo por un valor aislado.",
            },
            {
                type: "paragraph",
                content:
                    "Si estás en tratamiento, procura realizar tus controles en el mismo laboratorio y en horarios similares, para mejorar comparabilidad de resultados.",
            },
        ],
    },

    {
        id: "post-005",
        title: "Check-up anual: 8 estudios frecuentes y por qué se solicitan",
        slug: "checkup-anual-estudios-frecuentes",
        author: {
            name: "QFB. Mariana López",
            avatar: qfb1M,
        },
        description:
            "Una lista práctica de estudios comunes en chequeos preventivos y qué información aportan de forma general.",
        date: "2025-09-15",
        tags: ["checkup", "prevención", "salud"],
        category: "Prevención",
        excerpt:
            "Un check-up no es solo una lista de análisis: es una foto general de tu salud. Te explicamos los más comunes y su utilidad.",
        image: undefined,
        readingTime: 8,
        metaDescription:
            "Check-up anual: estudios frecuentes en laboratorio clínico (biometría, química, lípidos y más) y su propósito general.",
        status: "published",
        content: [
            {
                type: "paragraph",
                content:
                    "Los chequeos preventivos ayudan a detectar alteraciones antes de que haya síntomas. La selección de estudios depende de edad, antecedentes, estilo de vida y valoración médica.",
            },
            {
                type: "subtitle",
                content: "Estudios frecuentes en un check-up",
            },
            {
                type: "list",
                items: [
                    { title: "Biometría hemática", text: "Evalúa glóbulos rojos, blancos y plaquetas; útil para anemia e infecciones." },
                    { title: "Glucosa", text: "Orienta sobre control de azúcar y riesgo de diabetes." },
                    { title: "Perfil de lípidos", text: "Colesterol y triglicéridos; ayuda a estimar riesgo cardiovascular." },
                    { title: "Química sanguínea", text: "Puede incluir función renal y hepática, entre otros parámetros." },
                    { title: "EGO / Uroanálisis", text: "Evalúa orina para detectar infecciones o alteraciones metabólicas." },
                    { title: "TSH", text: "Tamizaje de función tiroidea en casos indicados." },
                    { title: "Ácido úrico", text: "Relacionado con gota y metabolismo; se solicita según criterio clínico." },
                    { title: "Vitamina D (si aplica)", text: "Se solicita en poblaciones con riesgo o síntomas; depende del contexto." },
                ],
            },
            {
                type: "quote",
                content:
                    "Lo ideal es que tu médico indique el check-up según tu historia clínica; evita estudios innecesarios.",
            },
            {
                type: "paragraph",
                content:
                    "En el laboratorio te orientamos sobre preparación (ayuno, horarios y recolección de muestras) para obtener resultados confiables.",
            },
        ],
    },
    {
        id: "post-006",
        title: "Hemoglobina glucosilada (HbA1c): qué es y cuándo se usa",
        slug: "hemoglobina-glucosilada-hba1c-que-es",
        author: {
            name: "Dra. Fernanda Ruiz",
            avatar: doc1M,
        },
        description:
            "Explicación sencilla de la HbA1c, su utilidad en el seguimiento de diabetes y consideraciones generales.",
        date: "2025-12-22",
        tags: ["diabetes", "HbA1c", "glucosa"],
        category: "Química clínica",
        excerpt:
            "La HbA1c refleja el promedio de glucosa en los últimos meses y es clave para evaluar control metabólico, junto con otros indicadores.",
        image: undefined,
        readingTime: 6,
        metaDescription:
            "Qué es la HbA1c, para qué sirve y cómo se interpreta de forma general en laboratorio clínico.",
        status: "draft",
        content: [
            {
                type: "paragraph",
                content:
                    "La hemoglobina glucosilada (HbA1c) es un marcador que ayuda a estimar el promedio de glucosa en sangre de las últimas semanas. Se usa con frecuencia para seguimiento y control en personas con diabetes, siempre en conjunto con la valoración médica.",
            },
            {
                type: "subtitle",
                content: "¿Por qué no reemplaza a la glucosa en ayuno?",
            },
            {
                type: "paragraph",
                content:
                    "Ambas pruebas aportan información distinta: la glucosa en ayuno muestra un valor puntual; la HbA1c aporta una perspectiva de control a mediano plazo.",
            },
            {
                type: "quote",
                content:
                    "Si tienes anemia o ciertas condiciones hematológicas, la HbA1c puede requerir interpretación especial.",
            },
        ],
    },
];
