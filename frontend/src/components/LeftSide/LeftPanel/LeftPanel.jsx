import React from 'react';
import Search from "../Search/Search";
import List from "../List/List";
import cl from './LeftPanel.module.css'
import {useNavStore} from "../../../store/NavStore";
import Modal from "../../Modal/Modal";
import {useModalStore} from "../../../store/ModalStore";
import {useContactsStore} from "../../../store/ContactsStore";
import CreateGroupChat from "../../GroupContacts/CreateGroupChat";

const LeftPanel = () => {

    const activeNavigation = useNavStore(state => state.active)
    const setModalActive = useModalStore(state => state.setActive)
    const modalActive = useModalStore(state => state.active)


    const getSvg = () => {
        return (<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"
                     style={{position: 'absolute', cursor: 'pointer', right: '10px'}}
                     onClick={() => {
                         // if (contacts.length === 0)
                         // fetchContacts()
                         setModalActive(true)
                     }}>
                <path
                    d="M22.7259 0.127105C22.9183 -0.0735369 23.2815 -0.0321508 23.5373 0.219555L23.7688 0.447443C24.0246 0.699149 24.076 1.06583 23.8836 1.26647L23.5353 1.62976C23.4391 1.73008 23.2575 1.70939 23.1296 1.58352L22.435 0.899925C22.3071 0.774055 22.2814 0.590709 22.3776 0.490395L22.7259 0.127105Z"
                    fill="grey"/>
                <path
                    d="M21.8551 1.03533C21.9513 0.935021 22.133 0.955711 22.2608 1.08158L22.9554 1.76517C23.0833 1.89104 23.109 2.07439 23.0128 2.1747L10.5609 15.1623C10.24 15.497 9.36825 15.7689 8.93188 15.8887C8.82689 15.9176 8.70832 15.8009 8.73376 15.6937C8.83936 15.2483 9.08231 14.3576 9.40318 14.0229L21.8551 1.03533Z"
                    fill="grey"/>
                <path
                    d="M4.17026 2.97584C2.41937 2.97584 1 4.41391 1 6.18786V20.788C1 22.5619 2.41937 24 4.17026 24H18.5805C20.3314 24 21.7508 22.5619 21.7508 20.788V9.10789C21.7508 8.62408 21.3637 8.23188 20.8862 8.23188C20.4086 8.23188 20.0215 8.62408 20.0215 9.10789V20.788C20.0215 21.5943 19.3764 22.248 18.5805 22.248H4.17026C3.3744 22.248 2.72923 21.5943 2.72923 20.788V6.18786C2.72923 5.38152 3.3744 4.72785 4.17026 4.72785H16.2749C16.7524 4.72785 17.1395 4.33565 17.1395 3.85185C17.1395 3.36804 16.7524 2.97584 16.2749 2.97584H4.17026Z"
                    fill="grey"/>
            </svg>
        )
    }

    function currentActive() {
        if (activeNavigation === 'allChats')
            return (
                <div className={cl.header}>
                    <span className={cl.active}>Chats</span>
                    {getSvg()}
                </div>
            )
        else
            return <div className={cl.header}>
                <span className={cl.active}>Contacts</span>
                {getSvg()}
            </div>
    }

    return (
        <div className={cl.leftPanel}>
            {currentActive()}

            <Search/>
            <List/>
            <Modal>
                {modalActive ? <CreateGroupChat/> : <></>}
            </Modal>

        </div>
    );
};

export default LeftPanel;