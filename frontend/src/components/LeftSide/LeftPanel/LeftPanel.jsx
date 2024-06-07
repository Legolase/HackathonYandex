import React from 'react';
import Search from "../Search/Search";
import List from "../List/List";
import cl from './LeftPanel.module.css'
import {useNavStore} from "../../../store/NavStore";
import Modal from "../../Modal/Modal";
import {useModalStore} from "../../../store/ModalStore";
import CreateGroupChat from "../../GroupContacts/CreateGroupChat";
import {CreateIcon} from "../../Icon/Icon";

const LeftPanel = () => {

    const activeNavigation = useNavStore(state => state.active)
    const setModalActive = useModalStore(state => state.setActive)
    const modalActive = useModalStore(state => state.active)

    function currentActive() {
        if (activeNavigation === 'allChats')
            return (
                <div className={cl.header}>
                    <span className={cl.active}>Chats</span>
                    <button className={cl.icon} onClick={() => {
                        setModalActive(true)
                    }}>
                        <CreateIcon/>
                    </button>
                </div>
            )
        else
            return <div className={cl.header}>
                <span className={cl.active}>Contacts</span>
            </div>
    }

    const getSearch = () =>{
        if (activeNavigation === 'contacts')
            return <Search/>
        return <></>
    }

    return (
        <div className={cl.leftPanel}>
            {currentActive()}
            <hr/>
            {getSearch()}
            {/*<Search/>*/}
            <List/>
            <Modal>
                {modalActive ? <CreateGroupChat/> : <></>}
            </Modal>

        </div>
    );
};

export default LeftPanel;