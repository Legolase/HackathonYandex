import React from 'react';
import cl from './EnterGithub.module.css'

const EnterGithub = () => {
    console.log(process.env.REACT_APP_BACKEND_URL + '/auth/github')

    return (
        <div className={cl.enter}>
            <a className={cl.github} href={process.env.REACT_APP_BACKEND_URL + '/auth/github'}>Войти через GitHub</a>
        </div>
    );
};

export default EnterGithub;