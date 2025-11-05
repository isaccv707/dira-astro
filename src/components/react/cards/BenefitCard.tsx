
import { motion } from "framer-motion";
import type { Benefits } from "../../../interfaces/service.interface";


interface BenefitCardProps {
    benefit: Benefits;
}

const BenefitCard = ({ benefit }:BenefitCardProps) => {
    return (
        <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 1 * 0.1 }}
            viewport={{ once: true }}
            className="bg-green-50 hover:bg-green-100 transition-all rounded-2xl p-6 text-center shadow-sm"
        >
            <div className="text-5xl mb-4">{benefit.icon}</div>
            <h4 className="text-lg font-semibold text-green-primary mb-2">
                {benefit.title}
            </h4>
            <p className="text-gray-600 text-sm">{benefit.text}</p>
        </motion.div>
    )
}

export default BenefitCard
