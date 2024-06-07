import React from 'react';
import {useLoggedInUserStore} from "../../store/LoggedInUserStore";
import cl from './Settings.module.css'
import Setting from "../Setting/Setting";

const Settings = () => {
    const curUser = useLoggedInUserStore(state => state.currentUser)
    const generateAvatar = useLoggedInUserStore(state => state.generateAvatar)

    const names = ['Upload profile photo', 'Generate profile photo', 'Change user name',
        'Change user login', 'Notifications', 'Appearance', 'Language']

    // todo: Здесь текст
    return (
        <div className={`${cl.settings} right-side`}>
            <div className={cl.header}>
                <img className={cl.avatar} src={curUser.avatar}/>
                <div className={cl.textInfo}>
                    <span className={cl.name}>Name: {curUser.name}</span>
                    <span className={cl.login}>Login: {curUser.login}</span>
                </div>

            </div>
            <div className={cl.body}>
                <div className={cl.column}>
                    <Setting name={'file'} text={names[0]}/>
                    <Setting name={'file'} text={names[1]} handler={() => {
                        generateAvatar(curUser)
                    }}/>
                </div>
                <div className={cl.column}>
                    <Setting name={'file'} text={names[2]}/>
                    <Setting name={'file'} text={names[3]}/>
                </div>
                <div className={cl.column}>
                    <Setting name={'notification'} text={names[4]}/>
                    <Setting name={'appearance'} text={names[5]}/>
                    <Setting name={'language'} text={names[6]}/>
                </div>
            </div>
        </div>
    );


};

export default Settings;