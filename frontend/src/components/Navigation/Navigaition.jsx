import React from 'react';
import cl from './Navigation.module.css'
import {useNavStore} from "../../store/NavStore";
import NavigationItem from "../NavigationItem/NavigationItem";
import {useNavigate} from "react-router";

const Navigation = () => {

    const setActive = useNavStore(state => state.setActive)
    const router = useNavigate()


    return (
        <div className={cl.navigation}>

            <NavigationItem
                desc={'All chats'}
                svg_name={'allChats'}
                handler={() => setActive('allChats')}
            />
            <NavigationItem
                desc={'Contacts'}
                svg_name={'contacts'}
                handler={() => setActive('contacts')}
            />

            <NavigationItem
                desc={'Settings'}
                svg_name={'settings'}
                handler={() => {
                    router(`/settings`)
                }}
            />


            {/*<div className={cl.nav_item} onClick={}>*/}
            {/*    <svg className={cl.nav_svg}>*/}
            {/*        <use href={`sprite.svg#`}></use>*/}
            {/*    </svg>*/}
            {/*    <span className={cl.desc}></span>*/}
            {/*</div>*/}

            {/*<div className={cl.nav_item} onClick={() => handler('Contacts')}>*/}
            {/*    <svg className={cl.nav_svg}>*/}
            {/*        <use href={`sprite.svg#contacts`}></use>*/}
            {/*    </svg>*/}
            {/*    <span className={cl.desc}>Contacts</span>*/}
            {/*</div>*/}

            {/*<div className={cl.nav_item}>*/}
            {/*    <svg className={cl.nav_svg}>*/}
            {/*        <use href={`sprite.svg#settings`}></use>*/}
            {/*    </svg>*/}
            {/*    <span className={cl.desc}>Settings</span>*/}
            {/*</div>*/}

        </div>
    );
};

export default Navigation;