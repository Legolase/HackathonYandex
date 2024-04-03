import React, {useEffect, useState} from 'react';
import Tab from "../Tab/Tab";
import cl from './Tabs.module.css'
import {useLeftPanelStore} from "../../store/LeftPanelStore";

const Tabs = () => {

    const [active, setActive] = useState('Messages')

    const fetchContacts = useLeftPanelStore(state => state.fetchContacts)
    const fetchChats = useLeftPanelStore(state => state.fetchChats)
    const setEmptyItems = useLeftPanelStore(state => state.setEmptyContent)

    const handler = (active) => {
        setActive(active)
    }

    useEffect(() => {
        setEmptyItems()
        if (active === 'Messages')
            fetchChats()
        else
            fetchContacts()
    }, [active]);


    return (
        <div className={cl.tabs}>
            <Tab name={'Messages'} handler={handler} active={active}/>
            <Tab name={'Contacts'} handler={handler} active={active}/>
        </div>
    );
};

export default Tabs;