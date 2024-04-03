import React from 'react';
import cl from './Profile.module.css'

const Profile = () => {

    const url = "https://res.cloudinary.com/practicaldev/image/fetch/s--zqAnyWih--/c_imagga_scale,f_auto,fl_progressive,h_420,q_auto,w_1000/https://res.cloudinary.com/dzynqn10l/image/upload/v1632280924/JS%2520Bits/cover_gaenes.jpg"

    return (
        <header className={cl.profile}>
            <img className={cl.profileImg} src={url}/>
            <div className={cl.profileInfo}>
                <span className={cl.profileName}>Saleha Jamshed</span>
                <span className={cl.profileLogin}>@saleha123</span>
            </div>
        </header>
    );
};

export default Profile;