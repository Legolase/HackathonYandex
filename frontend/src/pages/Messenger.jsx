import React, {useEffect} from 'react';
import LeftPanel from "../components/LeftSide/LeftPanel/LeftPanel";
import io from "socket.io-client";
import {useSocketStore} from "../store/SocketStore";
import Navigation from "../components/Navigation/Navigaition";

const Messenger = ({activePanel}) => {

    const setSocket = useSocketStore(state => state.setSocket)
    useEffect(() => {

        if (!localStorage['messages']) {
            localStorage['messages'] = JSON.stringify({
                key: 0,
                toSend: {}
            })
        }

        const socket = io('/');
        setSocket(socket)

        socket.on('connect', () => {
            const obj = JSON.parse(localStorage['messages'])
            const keys = Object.keys(obj.toSend)
            if (keys.length === 0) {
                obj.key = 0
                localStorage['messages'] = JSON.stringify(obj)
            } else {
                for (const key of keys) {
                    const data = obj.toSend[key]
                    delete obj.toSend[key]
                    socket.emit('send_message', data)
                    localStorage['messages'] = JSON.stringify(obj)
                }
            }
        })


        return () => {
            socket.close()
        }
    }, []);

    return (
        <div className={'messenger'}>
            <Navigation/>
            <LeftPanel/>
            {activePanel}
        </div>
    );
};

export default Messenger;