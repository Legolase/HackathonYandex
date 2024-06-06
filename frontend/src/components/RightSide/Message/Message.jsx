import React from 'react';
import cl from './Message.module.css';
import {PhotoView} from 'react-photo-view';

const Message = ({message, my}) => {

    // todo: Change to userAvatar
    const url = "https://res.cloudinary.com/practicaldev/image/fetch/s--zqAnyWih--/c_imagga_scale,f_auto,fl_progressive,h_420,q_auto,w_1000/https://res.cloudinary.com/dzynqn10l/image/upload/v1632280924/JS%2520Bits/cover_gaenes.jpg"

    const root = [cl.message]

    const formatTime = (dateString) => {
        const date = new Date(dateString);
        const hours = date.getHours().toString().padStart(2, '0');
        const minutes = date.getMinutes().toString().padStart(2, '0');
        return `${hours}:${minutes}`;
    };

    const viewMessage = () => {
        return (
            <div className={cl.right}>
                <div className={my ? cl.myText : cl.text}>

                    {/*text*/}
                    {message.type === 'text' && message.value}

                    {/*Image*/}
                    {message.type === 'image' &&
                        <PhotoView key={message.id} src={message.value}>
                            <img className={cl.messageContentImage} src={message.value} alt='Uploaded image'/>
                        </PhotoView>}

                    {/*File*/}
                    {message.type === 'document' &&
                        <a href={message.value} target="_blank">{message.file_name}</a>
                    }
                    <div>
                        <div style={{width: '35px'}}></div>
                        <span className={cl.myTime}>{formatTime(message.datetime)}</span>
                    </div>
                </div>
            </div>);
    }

    if (my) {
        root.push(cl.myMessage)
        return (
            <div className={root.join(' ')}>
                {viewMessage()}
                {/*<img className={cl.messageImg} src={url}/>*/}
            </div>
        );
    }

    return (
        <div className={cl.message}>
            <img className={cl.messageImg} src={url}/>
            {viewMessage()}
        </div>
    );
};

export default Message;