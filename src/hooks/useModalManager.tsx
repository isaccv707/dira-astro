import type { MODALS } from "../components/react/modal/modals";
import { useModal, type ModalPropsType } from "../contexts/ModalContext"

const useModalManager = () => {
    const { closeModal, openModalByKey } = useModal();
    return {
        open: (key: keyof typeof MODALS, props: ModalPropsType) =>
            openModalByKey(key, props),
        close: (id: string) => closeModal(id)
    }
}

export default useModalManager
