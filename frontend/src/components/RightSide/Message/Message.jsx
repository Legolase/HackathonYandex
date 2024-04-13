import React from 'react';
import cl from './Message.module.css'
import Markdown from "react-markdown";

const Message = ({message, my}) => {

    const url = "https://res.cloudinary.com/practicaldev/image/fetch/s--zqAnyWih--/c_imagga_scale,f_auto,fl_progressive,h_420,q_auto,w_1000/https://res.cloudinary.com/dzynqn10l/image/upload/v1632280924/JS%2520Bits/cover_gaenes.jpg"

    if (my)
        return (
            <div className={cl.message}>
                <div className={cl.right}>
                    <div className={cl.myText}>
                        <Markdown>
                            {message.text}
                        </Markdown>
                    </div>
                    <span className={cl.myTime}>{message.datetime}</span>
                </div>
                <img className={cl.messageImg} src={url}/>
            </div>
        );

    return (
        <div className={cl.message}>
            <img className={cl.messageImg} src={url}/>
            <div className={cl.right}>
                <div className={cl.text}>{message.text}</div>
                <span className={cl.time}>{message.datetime}</span>
            </div>
        </div>
    );
};

export default Message;