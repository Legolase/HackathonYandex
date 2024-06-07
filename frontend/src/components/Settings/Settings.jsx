import React, {useRef, useState} from 'react';
import {useLoggedInUserStore} from "../../store/LoggedInUserStore";
import cl from './Settings.module.css'
import Setting from "../Setting/Setting";
import Modal from "../Modal/Modal";
import {useModalStore} from "../../store/ModalStore";

const Settings = () => {
    const curUser = useLoggedInUserStore(state => state.currentUser)
    const generateAvatar = useLoggedInUserStore(state => state.generateAvatar)
    const dialog = useRef(null)
    const [name, setName] = useState('')
    const changeName = useLoggedInUserStore(state => state.changeName)
    const [error, setError] = useState('')

    const names = ['Upload profile photo', 'Generate profile photo', 'Change user name',
        'Change user login', 'Notifications', 'Appearance', 'Language']


    const validateAndSendName = (e) => {
        e.preventDefault()
        if (name.trim().length === 0) {
            setError('Name must contains letters')
            return
        }
        dialog.current.close()
        changeName(name.trim())
    }

    return (
        <div className={`${cl.settings} right-side`}>
            <div className={cl.header}>
                <img className={cl.avatar} src={curUser.avatar}/>
                <div className={cl.textInfo}>
                    <span className={cl.name}>Name: {curUser.name}</span>
                    <span className={cl.login}>Login: {curUser.login}</span>
                </div>

            </div>
            <div className={cl.body}>
                <div className={cl.column}>
                    <Setting name={'file'} text={names[0]}/>
                    <Setting name={'file'} text={names[1]} handler={() => {
                        generateAvatar(curUser)
                    }}/>
                </div>
                <div className={cl.column}>
                    <Setting name={'file'} text={names[2]} handler={() => {
                        dialog.current.showModal()
                    }}/>
                    <Setting name={'file'} text={names[3]}/>
                </div>
                <div className={cl.column}>
                    <Setting name={'notification'} text={names[4]}/>
                    <Setting name={'appearance'} text={names[5]}/>
                    <Setting name={'language'} text={names[6]}/>
                </div>
            </div>

            <dialog ref={dialog} className={cl.dialog}>
                <form className={cl.form} onSubmit={(e) => {
                    validateAndSendName(e)
                }}>
                    <input className={cl.input} placeholder={'Enter name'} value={name} required={true}
                           onChange={(e) => {
                               setName(e.target.value)
                               setError('')
                           }}/>
                    <button className={cl.button} type={"submit"} onSubmit={(e) => {
                        validateAndSendName(e)
                    }}>
                        Submit
                    </button>
                    {error ? <span style={{color: 'red', fontSize: 'var(--font-size-xxs)'}}>{error}</span> : <></>}
                </form>
            </dialog>

        </div>
    );


};

export default Settings;