import React, {useEffect} from 'react';
import Tab from "../Tab/Tab";
import cl from './Tabs.module.css'
import {useLeftPanelStore} from "../../../store/LeftPanelStore";

const Tabs = () => {



    const setActive = useLeftPanelStore(state => state.setActive)
    const active = useLeftPanelStore(state => state.active)
    const setLoading = useLeftPanelStore(state => state.setLoading)


    const handler = (active) => {
        setLoading(true)
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