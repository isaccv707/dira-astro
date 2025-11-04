import { Calendar } from "lucide-react"; // ícono de calendario
import NavLinkButton from "../ui/NavLinkButton";

const CardProduct = ({
    description,
    id,
    path,
    title,
    isRequiredAppointment,
    preparation,
    price,
}:any) => {
    return (
        <div className="max-w-sm w-full bg-white dark:bg-primary border border-gray-200 dark:border-primary rounded-2xl shadow-md p-6 flex flex-col items-center text-center hover:shadow-2xl hover:-translate-y-1 transition-all duration-300">

            {/* Título */}
            <h5 className="mb-3 text-lg sm:text-xl font-bold tracking-tight text-green-primary">
                {title}
            </h5>

            {/* Icono de cita si aplica */}
            {isRequiredAppointment && (
                <div className="flex items-center gap-2 mb-4 text-red-600 font-semibold">
                    <Calendar className="w-5 h-5" />
                    <span>Se requiere agendar cita</span>
                </div>
            )}

            {/* Descripción */}
            <p className="mb-6 text-sm sm:text-base text-gray-700 dark:text-gray-300 leading-relaxed">
                {description}
            </p>

            {/* Preparación / Precio opcional */}
            {preparation && (
                <p className="mb-4 text-sm sm:text-base text-gray-600 dark:text-gray-400">
                    <span className="font-semibold">Preparación:</span> {preparation}
                </p>
            )}
            {price && (
                <p className="mb-4 text-sm sm:text-base text-gray-600 dark:text-gray-400">
                    <span className="font-semibold">Precio:</span> ${price}
                </p>
            )}

            {/* Botón */}
            <div className="mt-auto w-full">
                <NavLinkButton
                    path={`/contact`}
                    text="Agendar cita"
                    variant="primary"
                    size="md"
                />
            </div>
        </div>
    );
};

export default CardProduct;
