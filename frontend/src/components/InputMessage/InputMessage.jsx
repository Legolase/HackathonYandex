import React, {useRef, useState} from 'react';
import cl from './InputMessage.module.css'
import {useMessagesStore} from "../../store/MessagesStore";

const InputMessage = () => {


    const addMessage = useMessagesStore(state => state.addMessage)
    const [inputValue, setInputValue] = useState('')
    const sendMessage = () => {
        addMessage(inputValue)
        setInputValue('')
    }


    return (
        <div className={cl.messageInput}>
            <svg width="80" height="80" fill="none" xmlns="http://www.w3.org/2000/svg" viewBox='0 0 100 100'>
                <path
                    d="M19.214 3.372a9.39 9.39 0 0 1 3.043-2.267 8.722 8.722 0 0 1 3.61-.814 8.711 8.711 0 0 1 3.62.765 9.363 9.363 0 0 1 3.069 2.225 10.316 10.316 0 0 1 2.043 3.342c.471 1.25.71 2.59.702 3.941a10.994 10.994 0 0 1-.748 3.931 10.285 10.285 0 0 1-2.083 3.314l-14.582 15.88a5.628 5.628 0 0 1-1.825 1.349 5.233 5.233 0 0 1-2.161.48 5.227 5.227 0 0 1-2.165-.46A5.618 5.618 0 0 1 9.9 33.724a6.189 6.189 0 0 1-1.224-1.998 6.602 6.602 0 0 1-.424-2.358 6.598 6.598 0 0 1 .441-2.353c.288-.745.71-1.42 1.238-1.988l14.584-15.88 2.652 2.887-14.584 15.88a2.057 2.057 0 0 0-.42.663 2.2 2.2 0 0 0-.013 1.579c.094.25.233.478.41.67.175.192.385.343.615.446a1.743 1.743 0 0 0 1.45-.014 1.88 1.88 0 0 0 .609-.457l14.586-15.88a6.188 6.188 0 0 0 1.22-1.988c.282-.743.427-1.54.427-2.344 0-.804-.145-1.6-.428-2.344a6.187 6.187 0 0 0-1.22-1.987 5.62 5.62 0 0 0-1.824-1.328 5.23 5.23 0 0 0-2.153-.466 5.23 5.23 0 0 0-2.153.466 5.62 5.62 0 0 0-1.825 1.328L7.281 22.14c-1.707 1.925-2.652 4.504-2.631 7.18.021 2.677 1.007 5.238 2.745 7.13 1.739 1.893 4.09 2.967 6.548 2.99 2.458.023 4.826-1.006 6.595-2.865l15.91-17.324 2.652 2.89-15.91 17.323c-2.46 2.68-5.8 4.186-9.28 4.186-3.482 0-6.82-1.506-9.282-4.186C2.167 36.785.784 33.149.784 29.358c0-3.79 1.383-7.426 3.844-10.106l14.586-15.88Z"
                    fill="#4A4A4A" fillOpacity=".51" transform='translate(10,30)'/>
            </svg>
            <input className={cl.input} placeholder={'Write message...'} value={inputValue}
                   onChange={(e) => setInputValue(e.target.value)}/>
            <svg width="80" height="80" fill="none" xmlns="http://www.w3.org/2000/svg" viewBox='0 0 100 100'>
                <path
                    d="M24.5 33.542c4.757 0 8.78-2.799 10.433-6.709H14.067c1.633 3.91 5.676 6.709 10.433 6.709Zm-7.146-12.459c.812 0 1.591-.302 2.166-.842.574-.539.897-1.27.897-2.033 0-.762-.323-1.493-.897-2.033a3.167 3.167 0 0 0-2.166-.842c-.812 0-1.591.303-2.165.842a2.789 2.789 0 0 0-.897 2.033c0 .763.322 1.494.897 2.033.574.54 1.353.842 2.165.842Zm14.292 0c.812 0 1.591-.302 2.165-.842.575-.539.897-1.27.897-2.033 0-.762-.322-1.493-.897-2.033a3.167 3.167 0 0 0-2.165-.842c-.812 0-1.591.303-2.166.842a2.789 2.789 0 0 0-.897 2.033c0 .763.323 1.494.897 2.033.575.54 1.354.842 2.166.842ZM24.5 38.333c-4.332 0-8.486-1.615-11.55-4.49C9.888 30.966 8.168 27.066 8.168 23s1.72-7.967 4.784-10.842c3.063-2.876 7.217-4.491 11.549-4.491s8.486 1.615 11.55 4.49c3.063 2.876 4.783 6.776 4.783 10.843s-1.72 7.967-4.784 10.842c-3.063 2.876-7.217 4.491-11.549 4.491Zm0-34.5C13.21 3.833 4.083 12.458 4.083 23c0 5.083 2.151 9.959 5.98 13.553a20.553 20.553 0 0 0 6.624 4.155 21.578 21.578 0 0 0 7.813 1.459c5.415 0 10.608-2.02 14.437-5.614 3.829-3.594 5.98-8.47 5.98-13.553 0-2.517-.528-5.01-1.555-7.335a19.134 19.134 0 0 0-4.425-6.218 20.552 20.552 0 0 0-6.624-4.155A21.578 21.578 0 0 0 24.5 3.833Z"
                    fill="#000" fillOpacity=".47" transform='translate(10,30)'/>
            </svg>
            <svg width="80" height="80" fill="none" xmlns="http://www.w3.org/2000/svg" viewBox='0 0 100 100'>
                <path onClick={(event) => {
                    event.stopPropagation()
                    sendMessage()
                }}
                      d="M42 6.667c4.596 0 9.148.862 13.394 2.537a35.164 35.164 0 0 1 11.355 7.226 33.275 33.275 0 0 1 7.587 10.814A31.961 31.961 0 0 1 77 40c0 8.84-3.688 17.319-10.251 23.57-6.564 6.251-15.466 9.763-24.749 9.763-4.596 0-9.148-.862-13.394-2.537a35.164 35.164 0 0 1-11.355-7.226C10.687 57.32 7 48.84 7 40s3.688-17.32 10.251-23.57C23.815 10.178 32.717 6.667 42 6.667ZM28 25.7v11.133L52.99 40 28 43.167V54.3L63 40 28 25.7Z"
                      fill="#FF5958" transform='translate(-5,10)'/>
            </svg>
        </div>
    );
};

export default InputMessage;