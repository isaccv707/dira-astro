import useModalManager from "../../../hooks/useModalManager"


interface ButtonModalProps {
    handleOpenModal: () => void;
}
const ButtonModal = ({ handleOpenModal }: ButtonModalProps) => {
    return (
        <button
            type="button"
            className="px-4 py-2 rounded-lg bg-white border border-gray-200 text-sm text-green-primary hover:bg-green-primary hover:text-white transition"
            data-quickview
            aria-controls="service-modal"
            aria-expanded="false"
            onClick={handleOpenModal}
        >
            Vista rápida
        </button>
    )
}

export default ButtonModal
