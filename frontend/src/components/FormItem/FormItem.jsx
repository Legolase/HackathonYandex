import React from 'react';
import cl from "../GroupContacts/CreateGroupChat.module.css";

const FormItem = ({contact, handler}) => {
    return (
        <div className={cl.formItem}>
            <div className={cl.contact}>
                <img src={contact.contact_user.avatar} className={cl.avatar}/>
                <span>{contact.contact_user.name}</span>
            </div>
            <input type={"checkbox"} onChange={(event) => {
                handler(event, contact.contact_user.id)
            }}/>
        </div>
    );
};

export default FormItem;