import React from 'react';
import cl from './EnterGithub.module.css'

const EnterGithub = () => {

    return (
        <a className={cl.github} href={'/auth/github'}>Войти через GitHub</a>

    );
};

export default EnterGithub;