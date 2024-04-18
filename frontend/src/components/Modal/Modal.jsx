import React from 'react';
import cl from './Modal.module.css'
import {useModalStore} from "../../store/ModalStore";

const Modal = ({children}) => {

    const root = [cl.modal]
    const {active, setActive} = useModalStore()
    if (active) {
        root.push(cl.modalActive)
    }
    return (
        <div className={root.join(' ')} onClick={() => {
            setActive(false)
        }}>
            <div className={cl.modalContent} onClick={(event) => event.stopPropagation()}>
                {children}
            </div>
        </div>
    );
};

export default Modal;