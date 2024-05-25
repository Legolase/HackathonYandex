import React, {useRef, useState} from 'react';
import cl from './InputMessage.module.css'
import {useMessagesStore} from "../../../store/MessagesStore";
import {post} from "axios";
import EmojiPicker from 'emoji-picker-react';
import {useSocketStore} from "../../../store/SocketStore";
import {useLoggedInUserStore} from "../../../store/LoggedInUserStore";
import {useCurrentChatStore} from "../../../store/CurrentChatStore";

const InputMessage = () => {


    const socket = useSocketStore(state => state.socket)
    const postMessage = useMessagesStore(state => state.postMessage)
    const [inputValue, setInputValue] = useState('')
    const [rows, setRows] = useState(1);
    const textareaRef = useRef(null);
    const formRef = useRef();
    const [showPicker, setShowPicker] = useState(false);

    const sendMessage = (event) => {
        console.log('submit')
        event.stopPropagation()
        event.preventDefault()
        if (inputValue.trim() === '')
            return
        const data = {
            "type": "text",
            "value": inputValue,
            "from": useLoggedInUserStore.getState().currentUser.id,
            "chat_id": useCurrentChatStore.getState().chat.id
        }
        socket.emit('send_message', data)
        // addMessage(inputValue)
        // postMessage(inputValue)
        setInputValue('')
    }

    const onEmojiClick = (event, emojiObject) => {
        console.log(emojiObject)
        setInputValue(prevInput => prevInput + emojiObject.emoji);
        setShowPicker(false);
    };


    const textareaChanged = async (e) => {
        setInputValue(e.target.value);
        await setRows(1);
        const computedStyle = window.getComputedStyle(textareaRef.current);
        const lineHeight = parseInt(computedStyle.lineHeight);
        const padding = parseInt(computedStyle.paddingTop) + parseInt(computedStyle.paddingBottom);
        const borderTop = parseInt(computedStyle.borderTopWidth);
        const borderBottom = parseInt(computedStyle.borderBottomWidth);
        const totalPadding = padding + borderTop + borderBottom;
        const lines = Math.floor((textareaRef.current.scrollHeight - totalPadding) / lineHeight);
        setRows(lines);
    };

    const handleKeyPress = (e) => {
        if (e.key === 'Enter' && e.shiftKey) {
            // TODO: add submit form!
            console.log(formRef.current);
        }
    }

    return (<>
            {showPicker && <EmojiPicker className={cl.emojiPicker} onEmojiClick={onEmojiClick} searchDisabled={true}/>}
            <form ref={formRef} className={cl.messageInput} onSubmit={(event) => sendMessage(event)} method={'post'}>
                {/* TODO: add onClick event! */}
                <button type={"submit"} className={cl.button} style={{backgroundColor: 'transparent', border: 'none'}}>
                    <svg className={cl.svg} width="40" height="44" viewBox="0 0 40 44" fill="none"
                         xmlns="http://www.w3.org/2000/svg">
                        <path
                            d="M19.2137 3.37202C20.0802 2.40442 21.1145 1.6338 22.2567 1.10486C23.3988 0.575925 24.626 0.299195 25.8671 0.290728C27.1082 0.28226 28.3386 0.542222 29.4867 1.05554C30.6348 1.56885 31.6779 2.32529 32.5555 3.28099C33.433 4.23669 34.1276 5.37261 34.5988 6.62287C35.0701 7.87313 35.3086 9.21283 35.3007 10.5643C35.2927 11.9157 35.0384 13.252 34.5525 14.4955C34.0666 15.7391 33.3587 16.8653 32.47 17.8086L17.8881 33.6887C17.3674 34.2652 16.7471 34.7236 16.0628 35.0377C15.3786 35.3517 14.644 35.5152 13.9015 35.5186C13.1589 35.522 12.4231 35.3652 11.7365 35.0574C11.0499 34.7496 10.426 34.2968 9.90091 33.7252C9.37579 33.1535 8.95981 32.4743 8.67697 31.7267C8.39413 30.9791 8.25002 30.1779 8.25296 29.3694C8.25589 28.5609 8.40582 27.761 8.69408 27.0158C8.98234 26.2707 9.40323 25.5951 9.93249 25.028L24.5162 9.14789L27.1675 12.0348L12.5837 27.9149C12.4047 28.1032 12.2618 28.3285 12.1635 28.5776C12.0653 28.8267 12.0136 29.0946 12.0114 29.3657C12.0092 29.6368 12.0567 29.9056 12.1509 30.1565C12.2452 30.4075 12.3844 30.6354 12.5605 30.8271C12.7365 31.0188 12.9459 31.1704 13.1763 31.2731C13.4068 31.3757 13.6537 31.4274 13.9026 31.425C14.1516 31.4227 14.3976 31.3664 14.6264 31.2593C14.8551 31.1523 15.062 30.9968 15.235 30.8018L29.8206 14.9217C30.343 14.3529 30.7574 13.6776 31.0401 12.9345C31.3228 12.1913 31.4683 11.3947 31.4683 10.5903C31.4683 9.78591 31.3228 8.98938 31.0401 8.24619C30.7574 7.50301 30.343 6.82774 29.8206 6.25893C29.2982 5.69013 28.6781 5.23892 27.9956 4.93109C27.3131 4.62325 26.5815 4.46481 25.8428 4.46481C25.104 4.46481 24.3725 4.62325 23.69 4.93109C23.0075 5.23892 22.3874 5.69013 21.865 6.25893L7.28124 22.1411C5.5735 24.0664 4.62856 26.645 4.64992 29.3216C4.67128 31.9982 5.65724 34.5586 7.39544 36.4513C9.13364 38.344 11.485 39.4176 13.9431 39.4409C16.4012 39.4641 18.7693 38.4352 20.5375 36.5756L36.4487 19.2521L39.1 22.1411L23.1906 39.4646C20.7291 42.1449 17.3905 43.6507 13.9094 43.6507C10.4282 43.6507 7.08965 42.1449 4.62811 39.4646C2.16657 36.7843 0.783691 33.1489 0.783691 29.3584C0.783691 25.5678 2.16657 21.9324 4.62811 19.2521L19.2137 3.37202Z"
                            fill="currentColor"/>
                    </svg>
                </button>
                <textarea ref={textareaRef} className={cl.textarea} rows={rows} placeholder={'Write message...'}
                          value={inputValue}
                          onChange={textareaChanged}
                          onKeyUp={handleKeyPress}
                />
                <button type={"button"} className={cl.button} onClick={() => setShowPicker(val => !val)} style={{backgroundColor: 'transparent', border: 'none'}}>
                    <svg width="49" height="46" viewBox="0 0 49 46" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path
                            d="M24.5 33.5417C29.2571 33.5417 33.2791 30.7433 34.9329 26.8333H14.0671C15.7004 30.7433 19.7429 33.5417 24.5 33.5417ZM17.3541 21.0833C18.1664 21.0833 18.9453 20.7804 19.5197 20.2413C20.094 19.7021 20.4166 18.9708 20.4166 18.2083C20.4166 17.4458 20.094 16.7146 19.5197 16.1754C18.9453 15.6362 18.1664 15.3333 17.3541 15.3333C16.5419 15.3333 15.763 15.6362 15.1886 16.1754C14.6143 16.7146 14.2916 17.4458 14.2916 18.2083C14.2916 18.9708 14.6143 19.7021 15.1886 20.2413C15.763 20.7804 16.5419 21.0833 17.3541 21.0833ZM31.6458 21.0833C32.458 21.0833 33.237 20.7804 33.8113 20.2413C34.3857 19.7021 34.7083 18.9708 34.7083 18.2083C34.7083 17.4458 34.3857 16.7146 33.8113 16.1754C33.237 15.6362 32.458 15.3333 31.6458 15.3333C30.8336 15.3333 30.0546 15.6362 29.4803 16.1754C28.906 16.7146 28.5833 17.4458 28.5833 18.2083C28.5833 18.9708 28.906 19.7021 29.4803 20.2413C30.0546 20.7804 30.8336 21.0833 31.6458 21.0833ZM24.5 38.3333C20.1681 38.3333 16.0137 36.7179 12.9506 33.8423C9.88747 30.9668 8.16665 27.0667 8.16665 23C8.16665 18.9334 9.88747 15.0333 12.9506 12.1577C16.0137 9.28215 20.1681 7.66668 24.5 7.66668C28.8318 7.66668 32.9863 9.28215 36.0494 12.1577C39.1125 15.0333 40.8333 18.9334 40.8333 23C40.8333 27.0667 39.1125 30.9668 36.0494 33.8423C32.9863 36.7179 28.8318 38.3333 24.5 38.3333ZM24.5 3.83334C13.2096 3.83334 4.08331 12.4583 4.08331 23C4.08331 28.0833 6.23435 32.9584 10.0632 36.5529C11.9591 38.3327 14.2098 39.7445 16.6869 40.7077C19.1639 41.6709 21.8188 42.1667 24.5 42.1667C29.9148 42.1667 35.1079 40.1473 38.9367 36.5529C42.7656 32.9584 44.9166 28.0833 44.9166 23C44.9166 20.483 44.3886 17.9907 43.3625 15.6652C42.3365 13.3398 40.8326 11.2269 38.9367 9.44713C37.0409 7.66734 34.7902 6.25553 32.3131 5.29232C29.836 4.3291 27.1811 3.83334 24.5 3.83334Z"
                            fill="black" fill-opacity="0.47"/>
                    </svg>
                </button>
                <button type={"submit"} className={cl.button}>
                    <svg className={cl.svg} width="24" height="24" viewBox="0 0 24 24" fill="none"
                         xmlns="http://www.w3.org/2000/svg">
                        <path fillRule="evenodd" clipRule="evenodd"
                              d="M12 24C18.6274 24 24 18.6274 24 12C24 5.37258 18.6274 0 12 0C5.37258 0 0 5.37258 0 12C0 18.6274 5.37258 24 12 24ZM15.7465 12.0717C16.0873 12.4125 16.6399 12.4125 16.9807 12.0717C17.3216 11.7308 17.3216 11.1783 16.9807 10.8374L12.6171 6.4738C12.2763 6.13298 11.7237 6.13298 11.3829 6.4738L7.01925 10.8374C6.67843 11.1783 6.67843 11.7308 7.01925 12.0717C7.36007 12.4125 7.91265 12.4125 8.25348 12.0717L11.1273 9.19786V17.4545C11.1273 17.9365 11.518 18.3273 12 18.3273C12.482 18.3273 12.8727 17.9365 12.8727 17.4545V9.19786L15.7465 12.0717Z"
                              fill="currentColor"/>
                        <path
                            d="M16.9807 12.0717C16.6399 12.4125 16.0873 12.4125 15.7465 12.0717L12.8727 9.19786V17.4545C12.8727 17.9365 12.482 18.3273 12 18.3273C11.518 18.3273 11.1273 17.9365 11.1273 17.4545V9.19786L8.25348 12.0717C7.91265 12.4125 7.36007 12.4125 7.01925 12.0717C6.67843 11.7308 6.67843 11.1783 7.01925 10.8374L11.3829 6.4738C11.7237 6.13298 12.2763 6.13298 12.6171 6.4738L16.9807 10.8374C17.3216 11.1783 17.3216 11.7308 16.9807 12.0717Z"
                            fill="currentColor" fillOpacity="0.05"/>
                    </svg>
                </button>
            </form>
        </>
    );
};

export default InputMessage;