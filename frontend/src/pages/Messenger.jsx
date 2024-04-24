import React from 'react';
import LeftPanel from "../components/LeftSide/LeftPanel/LeftPanel";
import Modal from "../components/Modal/Modal";
import SelectedChat from "../components/RightSide/SelectedChat/SelectedChat";
import {useRightPanelStore} from "../store/RightPanelStore";
import UserProfile from "../components/UserProfile/UserProfile";
import UnSelected from "../components/RightSide/UnSelected/UnSelected";

const Messenger = ({activePanel}) => {



    return (
        <div className={'messenger'}>
            <Modal>
                <div style={{backgroundColor: 'white'}}>
                    Салам
                </div>
            </Modal>
            <LeftPanel/>
            {activePanel}
        </div>
    );
};

export default Messenger;