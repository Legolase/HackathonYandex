import React from 'react';
import cl from './Profile.module.css'
import {useLoggedInUserStore} from "../../../store/LoggedInUserStore";
import {useNavigate} from "react-router";
import {useCurrentContactStore} from "../../../store/CurrentContactStore";

const Profile = () => {

    const user = useLoggedInUserStore(state => state.currentUser)
    const router = useNavigate()
    const setContact = useCurrentContactStore(state => state.setContact)

    return (
        <header className={cl.profile} onClick={()=>{
            setContact(user)
            router(`/user/${user.id}`)
        }}>
            <img className={cl.profileImg} src={user.avatar}/>
            <div className={cl.profileInfo}>
                <span className={cl.profileName}>{user.name}</span>
                <span className={cl.profileLogin}>{user.login}</span>
            </div>
        </header>
    );
};

export default Profile;