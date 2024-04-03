import React from 'react';
import cl from './Tab.module.css'
import {useLeftPanelStore} from "../../store/LeftPanelStore";

const Tab = ({name, handler, active}) => {

    const root = [cl.tab]
    if (name === active)
        root.push(cl.tabActive)
    else
        root.push(cl.tabInactive)
    return (
        <div>
            <span className={root.join(' ')} onClick={() => handler(name)}>{name}</span>
        </div>
    );
};

export default Tab;