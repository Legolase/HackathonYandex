import React from 'react';
import cl from './EnterGithub.module.css'

const EnterGithub = () => {

    return (
        <div className={cl.enter}>
            <a className={cl.github} href={'/auth/github'}>Войти через GitHub</a>
        </div>
    );
};

export default EnterGithub;