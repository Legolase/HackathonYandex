import React from 'react';
import cl from './UserProfile.module.css'
import Button from "../Button/Button";

const UserProfile = () => {

    const url = "https://res.cloudinary.com/practicaldev/image/fetch/s--zqAnyWih--/c_imagga_scale,f_auto,fl_progressive,h_420,q_auto,w_1000/https://res.cloudinary.com/dzynqn10l/image/upload/v1632280924/JS%2520Bits/cover_gaenes.jpg"

    const user = {
        "id": 1,
        "datetime_create": "2024-04-03T08:05:58.011Z",
        "datetime_last_activity": "2024-04-03T08:05:58.011Z",
        "name": "test",
        "login": "test",
        "email": null,
        "avatar": url,
        "github_id": null
    }

    const beginChat = () => {
        // начать чат - route to chat
    };
    return (
        <div>
            <div className={cl.header}>
                <img className={cl.avatar} src={url}/>
                <div className={cl.textInfo}>
                    <span className={cl.name}>{user.name}</span>
                    <span className={cl.login}>{user.login}</span>
                </div>
            </div>
            <div className={cl.buttons}>
                <Button onClickHandler={beginChat}>
                </Button>
            </div>
        </div>
    );
};

export default UserProfile;