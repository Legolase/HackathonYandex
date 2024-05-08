import React, {useEffect} from 'react';
import cl from "../List/List.module.css";
import Chat from "../Chat/Chat";
import {useChatsStore} from "../../../store/ChatsStore";
import {useTabsStore} from "../../../store/TabsStore";
import {useChangeActive} from "../../../hooks/useChangeActive";

const Chats = () => {

    const {chats, loading} = useChatsStore()
    const {active} = useTabsStore()
    const [downloadChats] = useChangeActive()


    useEffect(() => {
        if (chats.length !== 0)
            return
        downloadChats()
    }, [active]);

    if (loading)
        return <span>LOADING</span>

    return (
        <ul className={cl.chats}>
            {chats.map((chat, pos) =>
                <Chat chat={chat} key={pos}/>
            )}
        </ul>
    );
};

export default Chats;