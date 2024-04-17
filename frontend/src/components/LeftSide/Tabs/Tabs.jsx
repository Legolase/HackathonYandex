import React, {useEffect} from 'react';
import Tab from "../Tab/Tab";
import cl from './Tabs.module.css'
import {useTabsStore} from "../../../store/TabsStore";

const Tabs = () => {


    const {active, setActive, error } = useTabsStore()

    const handler = (active) => {
        setActive(active)
    }


    return (
        <div className={cl.tabs}>
            <Tab name={'Messages'} handler={handler} active={active}/>
            <Tab name={'Contacts'} handler={handler} active={active}/>
        </div>
    );
};

export default Tabs;