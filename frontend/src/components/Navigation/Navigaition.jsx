import React from 'react';
import cl from './Navigation.module.css'
import {useNavStore} from "../../store/NavStore";
import NavigationItem from "../NavigationItem/NavigationItem";
import {ChatsIcon, ContactsIcon, SettingsIcon} from "../Icon/Icon";
import {useNavigate} from "react-router";

const Navigation = () => {

    const setActive = useNavStore(state => state.setActive);
    const router = useNavigate()

    return (
        <div className={cl.navigation}>
            <NavigationItem
                desc={'All chats'}
                name={'allChats'}
                icon={<ChatsIcon className={cl.nav_svg}/>}
                handler={() => setActive('allChats')}
            />
            <NavigationItem
                desc={'Contacts'}
                name={'contacts'}
                icon={<ContactsIcon className={cl.nav_svg}/>}
                handler={() => setActive('contacts')}
            />
            <NavigationItem
                desc={'Settings'}
                name={'settings'}
                icon={<SettingsIcon className={cl.nav_svg}/>}
                handler={() => router('/settings')}
            />
        </div>
    );
};

export default Navigation;