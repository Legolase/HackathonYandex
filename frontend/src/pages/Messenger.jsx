import React from 'react';
import LeftPanel from "../components/LeftSide/LeftPanel/LeftPanel";
import Modal from "../components/Modal/Modal";

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