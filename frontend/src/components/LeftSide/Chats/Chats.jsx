import React, {useEffect} from 'react';
import cl from "../List/List.module.css";
import Chat from "../Chat/Chat";
import {useChatsStore} from "../../../store/ChatsStore";
import {useNavStore} from "../../../store/NavStore";
import {useChangeActive} from "../../../hooks/useChangeActive";

const Chats = () => {

    const {chats, loading} = useChatsStore()
    const {active} = useNavStore()
    const [downloadChats] = useChangeActive()


    useEffect(() => {
        if (chats.length !== 0)
            return
        downloadChats()
    }, [active]);

    if (loading)
        return <div style={{width: '100%'}}>LOADING</div>

    return (
        <ul className={cl.chats}>
            {chats.map((chat, pos) =>
                <Chat chat={chat} key={pos}/>
            )}
        </ul>
    );
};

export default Chats;