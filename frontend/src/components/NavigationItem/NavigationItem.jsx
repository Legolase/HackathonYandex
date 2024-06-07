import React from 'react';
import cl from "../Navigation/Navigation.module.css";
import {useNavStore} from "../../store/NavStore";

const NavigationItem = ({icon, name, desc}) => {

    const active = useNavStore(state => state.active)
    const setActive = useNavStore(state => state.setActive);
    const root = [cl.nav_item]
    if (active === name) {
        root.push(cl.nav_item__active);
    }

    return (
        <div className={root.join(' ')} onClick={() => setActive(name)}>
            {icon}
            <span className={cl.desc}>{desc}</span>
        </div>
    );
};

export default NavigationItem;