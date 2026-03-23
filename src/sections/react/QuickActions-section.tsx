
import { GiChemicalDrop } from "react-icons/gi";
import { quickActions } from "../../data/quickActions/quickActions";
import useModalManager from "../../hooks/useModalManager";
import { branches } from "../../data/branches/branches";

const QuickActions = () => {

    const { open } = useModalManager();

    const handleOpanModel = () => {
        open("MODAL_BRANCHES", {
            title: "Consulta de resultados",
            data: branches,
            paragraph: 'Selecciona la sucursal de tu preferencia.'
        })
    }

    return (
        <section className="flex flex-col md:flex-row justify-center items-center gap-6 md:gap-10">
            {
                quickActions.map(({ path, bgColor, Icon, text, disabled }, index) => (
                    <a
                        key={index}
                        href={path}
                        className={`flex items-center justify-center gap-4 text-white font-semibold rounded-xl shadow-md 
                                transition-all duration-300 ${bgColor} hover:brightness-110 w-full h-10 p-10 md:w-80 md:h-auto md:p-6`}
                    >
                        <div className="flex items-center justify-center w-12 h-12 rounded-full bg-white/20 text-2xl">
                            <Icon />
                        </div>
                        <span className="text-lg text-center">{text}</span>
                    </a>
                ))
            }
            <button
                onClick={handleOpanModel}
                className={`flex items-center justify-center gap-4 text-white font-semibold rounded-xl shadow-md 
                        transition-all duration-300 bg-green-secondary hover:brightness-110 w-full h-10 p-10 md:w-80 md:h-auto md:p-6 cursor-pointer`}
            >
                <div
                    className="flex items-center justify-center w-12 h-12 rounded-full bg-white/20 text-2xl"
                >
                    <GiChemicalDrop />
                </div>
                <span className="text-lg text-center">Resultados</span>
            </button>
        </section>
    )
}

export default QuickActions
