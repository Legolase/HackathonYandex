import React from 'react';
import cl from './Navigation.module.css'
import {useNavStore} from "../../store/NavStore";
import NavigationItem from "../NavigationItem/NavigationItem";
import {ChatsIcon, ContactsIcon, SettingsIcon} from "../Icon/Icon";

const Navigation = () => {
    return (
        <div className={cl.navigation}>
            <NavigationItem
                desc={'All chats'}
                name={'allChats'}
                icon={<ChatsIcon className={cl.nav_svg}/>}
            />
            <NavigationItem
                desc={'Contacts'}
                name={'contacts'}
                icon={<ContactsIcon className={cl.nav_svg}/>}
            />
            <NavigationItem
                desc={'Settings'}
                name={'settings'}
                icon={<SettingsIcon className={cl.nav_svg}/>}
                />
        </div>
    );
};

export default Navigation;