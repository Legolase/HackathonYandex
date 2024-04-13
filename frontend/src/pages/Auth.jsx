import React from 'react';
import Button from "../components/Button/Button";
import axios from "axios";

const Auth = () => {


    return (
        <div style={{display: "flex", alignItems: 'center', justifyContent: "center", flexDirection: "column"}}>
            <a href={'/auth/github'}>Войти через GitHub</a>
        </div>
    );
};

export default Auth;