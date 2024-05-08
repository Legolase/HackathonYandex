import React from 'react';
import cl from './Profile.module.css'
import {useLoggedInUserStore} from "../../../store/LoggedInUserStore";

const Profile = () => {

    const user = useLoggedInUserStore(state => state.currentUser)

    return (
        <header className={cl.profile}>
            <img className={cl.profileImg} src={user.avatar}/>
            <div className={cl.profileInfo}>
                <span className={cl.profileName}>{user.name}</span>
                <span className={cl.profileLogin}>{user.login}</span>
            </div>
        </header>
    );
};

export default Profile;