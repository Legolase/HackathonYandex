import React, {useState} from 'react';
import cl from './Contact.module.css'

const Contact = ({contact}) => {

    const root = [cl.contact]
    const [active, setActive] = useState(false)

    if (active)
        root.push(cl.active)

    return (
        <li className={root.join(' ')} onClick={() => {
            setActive(true)
        }}>
            <img className={cl.avatar} src={contact.avatar}/>
            <div className={cl.textInfo}>
                <span className={cl.name}>{contact.name}</span>
                <span className={cl.lastSeen}>{`Last seen: ${contact.last_seen}`}</span>
            </div>
        </li>
    );
};

export default Contact;