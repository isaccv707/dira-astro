import React from 'react'
import Modal from './Modal'
import useModalManager from '../../../hooks/useModalManager'
import type { Service } from '../../../interfaces/service.interface'

interface ModalServiceProps {
    id: string
    title: string;
    data: Service;
}
const ModalService = ({ id, data, title }: ModalServiceProps) => {
    const { close } = useModalManager()
    const onClose = () => close(id);
    const { description, icon, path, benefits, category, products, } = data;
    return (
        <Modal id={id} title={title} onClose={onClose} open={true}>
            <div>
                <div className=''>

                </div>
            </div>
        </Modal>
    )
}

export default ModalService
