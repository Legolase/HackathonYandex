import React from 'react';
import {LogoIcon} from "../components/Icon/Icon";

const Auth = () => {

    return (
        <div className={'auth'}>
            <LogoIcon className={'logo'}/>
            {/*todo: Текст*/}
            <a className={'auth-button'} href={'/auth/github'}>Войти через GitHub</a>
            {/*todo: поменять на родной язык и обратно*/}
            <button className={'auth-button'} onSubmit={() => {
            }}>
                Продолжить на русском
            </button>
            <span className={'desc'}>ВЕСомый мессенджер для значимого общения</span>
        </div>
    );
};

export default Auth;