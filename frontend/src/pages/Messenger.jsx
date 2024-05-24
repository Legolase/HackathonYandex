import React, {useEffect} from 'react';
import LeftPanel from "../components/LeftSide/LeftPanel/LeftPanel";
import io from "socket.io-client";
import {useSocketStore} from "../store/SocketStore";

const socket = io(process.env.REACT_APP_BACKEND_URL);
const Messenger = ({activePanel}) => {

    const setSocket = useSocketStore(state => state.setSocket)
    useEffect(() => {
        setSocket(socket)
    }, []);

    return (
        <div className={'messenger'}>
            <LeftPanel/>
            {activePanel}
        </div>
    );
};

export default Messenger;