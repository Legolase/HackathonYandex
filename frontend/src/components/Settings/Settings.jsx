import React, {useRef, useState} from 'react';
import {useLoggedInUserStore} from "../../store/LoggedInUserStore";
import cl from './Settings.module.css'
import Setting from "../Setting/Setting";
import Modal from "../Modal/Modal";
import {useModalStore} from "../../store/ModalStore";
import {useFilesStore} from "../../store/FilesStore";

const Settings = () => {
    const curUser = useLoggedInUserStore(state => state.currentUser)
    const generateAvatar = useLoggedInUserStore(state => state.generateAvatar)
    const changeName = useLoggedInUserStore(state => state.changeName)
    const changeAvatar = useLoggedInUserStore(state => state.changeAvatar)
    const saveFile = useFilesStore(state => state.saveFile)
    const dialog = useRef(null)
    const dialog2 = useRef(null)
    const [name, setName] = useState('')
    const [error, setError] = useState('')
    const [file, setFile] = useState(null)

    const names = ['Upload profile photo', 'Generate profile photo', 'Change user name',
        'Change user login', 'Notifications', 'Appearance', 'Language']


    const validateAndChangeName = (e) => {
        e.preventDefault()
        if (name.trim().length === 0) {
            setError('Name must contains letters')
            return
        }
        dialog.current.close()
        changeName(name.trim())
    }

    const changePhoto = async (e) => {
        e.preventDefault()
        try {
            const res = await saveFile(file)
            changeAvatar(res.data)
        } catch (err) {
            console.log(err)
        }

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
                    <Setting name={'file'} text={names[0]} handler={() => {
                        dialog2.current.showModal()
                    }}/>
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
                    validateAndChangeName(e)
                }}>
                    <input className={cl.input} placeholder={'Enter name'} value={name} required={true}
                           onChange={(e) => {
                               setName(e.target.value)
                               setError('')
                           }}/>
                    <button className={cl.button} type={"submit"} onSubmit={(e) => {
                        validateAndChangeName(e)
                    }}>
                        Submit
                    </button>
                    {error ? <span style={{color: 'red', fontSize: 'var(--font-size-xxs)'}}>{error}</span> : <></>}
                </form>
            </dialog>


            <dialog ref={dialog2} className={cl.dialog}>
                <form className={cl.form} onSubmit={(e) => {
                    changePhoto(e)
                }}>
                    <label htmlFor={'pretty_input'} className={cl.prettyInput}>Choose photo</label>
                    <input id={'pretty_input'} style={{display: 'none'}} type={'file'} accept={'image/*'}
                           required={true}
                           onChange={(e) => {
                               if (e.target.files.length > 0)
                                   setFile(e.target.files[0])
                           }}
                    />
                    <button className={cl.button} type={"submit"} onSubmit={(e) => {
                        changePhoto(e)
                    }}>
                        Submit
                    </button>
                </form>
            </dialog>

        </div>
    );


};

export default Settings;