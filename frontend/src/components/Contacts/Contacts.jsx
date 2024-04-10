import React from 'react';
import cl from "../List/List.module.css";
import Contact from "../Contact/Contact";
import {useLeftPanelStore} from "../../store/LeftPanelStore";

const Contacts = () => {

    const contentItems = useLeftPanelStore(state => state.contentItems)

    return (
        <ul className={cl.chats}>
            {contentItems.map((contact, pos) =>
                <div>
                    <Contact contact={contact} key={pos}/>
                    <hr/>
                </div>

            )}
        </ul>
    );
};

export default Contacts;