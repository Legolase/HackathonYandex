import React from 'react';
import cl from "../Navigation/Navigation.module.css";
import {useNavStore} from "../../store/NavStore";

const NavigationItem = ({icon, name, desc, handler}) => {

    const active = useNavStore(state => state.active)

    const root = [cl.nav_item]
    // if (active === name) {
    //     root.push(cl.nav_item__active);
    // }

    return (
        <div className={root.join(' ')} onClick={handler}>
            {icon}
            <span className={cl.desc}>{desc}</span>
        </div>
    );
};

export default NavigationItem;