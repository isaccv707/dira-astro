import NavLinkButton from "../../components/react/ui/NavLinkButton";
import type { ServiceProps } from "../../pages-react/ServiceDetail";
import { motion } from 'framer-motion';



const ServiceHero = ({ service }: ServiceProps) => {

    const { description, id,path, products, textButton, title } = service;
    return (
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <div className="text-center mb-12">
                <motion.h1
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="text-green-700 text-3xl sm:text-4xl font-extrabold tracking-tight"
                >
                    {title}
                </motion.h1>
                {/* <p className="mt-4 text-black max-w-2xl mx-auto text-base sm:text-lg">
                    {text}
                </p> */}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">

                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5 }}
                    className="relative rounded-2xl overflow-hidden shadow-lg"
                >
                    {/* <img
                        src={image.src}
                        alt={title}
                        className="w-full h-80 object-cover hover:scale-105 transition-transform duration-500"
                    /> */}
                </motion.div>


                <motion.div
                    initial={{ opacity: 0, x: 40 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                    className="space-y-6"
                >
                    <p className="text-gray-700 text-lg leading-relaxed">
                        {description || "Descubre cómo nuestros servicios pueden ayudarte a mejorar tu salud y bienestar con tecnología de vanguardia."}
                    </p>

                    <div>
                        <NavLinkButton
                            path={`/contact`}
                            text="Mas Informacion"
                            variant={'primary'}
                            size={'md'}
                        />
                    </div>
                </motion.div>
            </div>
        </div>
    )
}

export default ServiceHero;
