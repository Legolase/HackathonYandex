import React, {useEffect} from 'react';
import LeftPanel from "../components/LeftSide/LeftPanel/LeftPanel";
import io from "socket.io-client";
import {useSocketStore} from "../store/SocketStore";

const Messenger = ({activePanel}) => {

    const setSocket = useSocketStore(state => state.setSocket)
    useEffect(() => {
        const socket = io('/');
        setSocket(socket)
        return () => {
            socket.close()
        }
    }, []);

    return (
        <div className={'messenger'}>
            <LeftPanel/>
            {activePanel}
        </div>
    );
};

export default Messenger;