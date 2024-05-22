import React, {useEffect, useRef, useState} from 'react';
import cl from './Messages.module.css'
import Message from "../Message/Message";
import {useMessagesStore} from "../../../store/MessagesStore";
import {useLoggedInUserStore} from "../../../store/LoggedInUserStore";
import {useCurrentChatStore} from "../../../store/CurrentChatStore";

const Messages = () => {

    const [active, setActive] = useState(false)
    const messages = useMessagesStore(state => state.messages)
    const messagesEndRef = useRef(null)
    const loggedInUser = useLoggedInUserStore(state => state.currentUser)
    const getMessagesByChatId = useMessagesStore(state => state.getMessagesByChatId)
    const chatId = useCurrentChatStore(state => state.chat.id)
    const dnd = useRef(null)
    const dialog = useRef(null)
    const addFiles = useRef(null)
    const [files, setFiles] = useState([])
    const postFile = useMessagesStore(state => state.postFile)
    const root = [cl.dnd]

    if (active) {
        root.push(cl.dnd_active)
    }

    const scrollToBottom = () => {
        messagesEndRef.current.scrollIntoView()
    }

    useEffect(() => {
        scrollToBottom()
    }, [messages]);

    useEffect(() => {
        scrollToBottom()
        const intervalId = setInterval(() => {
            getMessagesByChatId(chatId)
        }, 1500)
        return () => {
            clearInterval(intervalId)
        }
    }, []);

    const dragOver = (e) => {
        e.preventDefault()
        setActive(true)
    }


    const dragLeave = (e) => {
        e.preventDefault()
        setActive(false)
    }

    const dragDrop = (e) => {
        e.preventDefault()
        setActive(false)

        if (e.dataTransfer.files.length > 0) {
            setFiles([...files, ...e.dataTransfer.files])

            dialog.current.showModal()
        }
    }

    const handleChangeAddFiles = (e) => {
        e.preventDefault()
        if (e.target.files.length > 0)
            setFiles([...files, ...e.target.files])
    }


    return (
        <div className={cl.messages}
             onDragOver={e => dragOver(e)}
        >
            {messages.map((message, pos) => {
                    return <Message key={pos} message={message} my={message.user_id === loggedInUser.id}/>
                }
            )}
            <div ref={messagesEndRef}></div>


            <div className={root.join(' ')} ref={dnd}
                 onDragLeave={e => dragLeave(e)}
                 onDrop={e => dragDrop(e)}
            >
                <input type={'file'} style={{display: 'none'}}/>
            </div>
            <dialog ref={dialog}
                    style={{
                        alignSelf: 'center',
                        justifySelf: 'center',
                        padding: '20px',
                        border: 'none',
                        borderRadius: '8px',
                    }}
                    onClose={() => {
                        setFiles([])
                    }}>
                <svg
                    style={{
                        position: "absolute",
                        top: 10,
                        right: 10
                    }}
                    onClick={() => {
                        setFiles([])
                        dialog.current.close()
                    }}
                    width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path
                        d="M22.7914 3.62571C23.4589 2.95824 23.4589 1.87605 22.7914 1.20857C22.124 0.541096 21.0418 0.541096 20.3743 1.20857L12 9.58286L3.62571 1.20857C2.95824 0.541095 1.87605 0.541096 1.20857 1.20857C0.541096 1.87605 0.541096 2.95824 1.20857 3.62571L9.58286 12L1.20857 20.3743C0.541095 21.0418 0.541096 22.124 1.20857 22.7914C1.87605 23.4589 2.95824 23.4589 3.62571 22.7914L12 14.4171L20.3743 22.7914C21.0418 23.4589 22.124 23.4589 22.7914 22.7914C23.4589 22.124 23.4589 21.0418 22.7914 20.3743L14.4171 12L22.7914 3.62571Z"
                        fill="black"/>
                </svg>
                <form
                    style={{display: 'flex', flexDirection: 'column', gap: '15px'}}
                    onSubmit={(e) => {
                        e.preventDefault()
                        console.log(files)
                        files.map((file) => {
                            postFile(file)
                        })
                        dialog.current.close()
                    }}>
                    <div style={{
                        overflowY: 'scroll',
                        maxHeight: '350px',
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '10px'
                    }}>
                        {files.map(file =>
                            <div style={{display: 'flex', gap: '10px'}}>
                                <div>
                                    <svg width="25" height="100%" viewBox="0 0 20 24" fill="none"
                                         xmlns="http://www.w3.org/2000/svg">
                                        <path fill-rule="evenodd" clip-rule="evenodd"
                                              d="M17.27 23.4768C16.2004 24 14.8003 24 12 24H8C5.19974 24 3.79961 24 2.73005 23.4768C1.78924 23.0166 1.02433 22.2823 0.544967 21.3792C0 20.3524 0 19.0083 0 16.32V7.68C0 4.99175 0 3.64762 0.544967 2.62085C1.02433 1.71767 1.78924 0.983361 2.73005 0.523169C3.79961 0 5.19974 0 8 0H9.34903C10.3274 0 10.8166 0 11.2769 0.1061C11.6851 0.200167 12.0753 0.35532 12.4331 0.565862C12.8368 0.803334 13.1827 1.1354 13.8745 1.79954L18.1255 5.88047C18.8173 6.5446 19.1632 6.87667 19.4106 7.26419C19.6299 7.60776 19.7915 7.98233 19.8895 8.37415C20 8.81609 20 9.2857 20 10.2249V16.32C20 19.0083 20 20.3524 19.455 21.3792C18.9757 22.2823 18.2108 23.0166 17.27 23.4768ZM17.1893 9.6H11C10.4477 9.6 10 9.17019 10 8.64V2.69823C10 2.05678 10.8079 1.73554 11.2803 2.18912L17.7197 8.37088C18.1921 8.82446 17.8575 9.6 17.1893 9.6Z"
                                              fill="black"/>
                                    </svg>
                                </div>
                                <div style={{display: 'flex', flexDirection: 'column', gap: '3px'}}>
                                    <span style={{fontSize: '18px'}}>{file.name}</span>
                                    <span style={{fontSize: '10px'}}>{file.size} bytes</span>
                                </div>
                            </div>
                        )}
                    </div>
                    <div style={{display: "flex", gap: '10px'}}>
                        <label className={'input-file'} style={{position: 'relative', display: 'inline-block'}}>
                            <input ref={addFiles} type={"file"} name={'file'} onChange={(e) => {
                                handleChangeAddFiles(e)
                            }}/>
                        </label>
                        <button type={"submit"}>Submit</button>
                    </div>
                </form>
            </dialog>
        </div>
    );
};

export default Messages;