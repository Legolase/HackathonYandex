import React from 'react';
import cl from "../Navigation/Navigation.module.css";
import {useNavStore} from "../../store/NavStore";

const NavigationItem = ({svg_name, handler, desc}) => {

    const active = useNavStore(state => state.active)
    const root = [cl.nav_item]

    return (
        <div className={root.join(' ')} onClick={() => handler()}>
            <svg className={cl.nav_svg}>
                <use href={`sprite.svg#${svg_name}`}></use>
            </svg>
            <span className={cl.desc}>{desc}</span>
        </div>
    );
};

export default NavigationItem;