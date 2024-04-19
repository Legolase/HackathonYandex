import React from 'react';
import LeftPanel from "../components/LeftSide/LeftPanel/LeftPanel";
import Modal from "../components/Modal/Modal";
import SelectedChat from "../components/RightSide/SelectedChat/SelectedChat";
import {useRightPanelStore} from "../store/RightPanelStore";
import UserProfile from "../components/UserProfile/UserProfile";
import UnSelected from "../components/RightSide/UnSelected/UnSelected";

const Messenger = () => {

    const active = useRightPanelStore(state => state.active)

    let activePanel;
    switch (active) {
        case 'Contact':
            activePanel = <UserProfile/>
            break
        case 'Messages':
            activePanel = <SelectedChat/>
            break
        default:
            activePanel = <UnSelected/>
    }



    return (
        <div className={'messenger'}>
            <Modal>
                <div style={{backgroundColor: 'white'}}>
                    Салам
                </div>
            </Modal>
            <LeftPanel/>
            {/* todo: Choose between chats and contacts*/}
            {activePanel}
            {/*<SelectedChat/>*/}
        </div>
    );
};

export default Messenger;