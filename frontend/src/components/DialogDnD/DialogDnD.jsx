import React from 'react';
import cl from './DialogDnD.module.css'
import Files from "../Files/Files";
import AddFiles from "../AddFiles/AddFiles";
import {useFilesStore} from "../../store/FilesStore";
import {useSocketStore} from "../../store/SocketStore";
import {useCurrentChatStore} from "../../store/CurrentChatStore";

const DialogDnD = ({dialog}) => {

    // todo: replace method to filesStore
    const saveFile = useFilesStore(state => state.saveFile)
    const socket = useSocketStore(state => state.socket)
    const files = useFilesStore(state => state.files)
    const nulifyFiles = useFilesStore(state => state.nulifyFiles)

    const uploadFile = async (file) => {
        try {
            const type = file.type.startsWith('image') ? 'image' : 'document'
            const response = await saveFile(file)
            socket.emit('send_message', {
                "type": type,
                "value": response.data.link,
                "file_name": response.data.name,
                "chat_id": useCurrentChatStore.getState().chat.id
            })
        } catch (e) {
            // todo: handle errors
        }
    }


    return (
        <dialog ref={dialog} className={cl.dialog}
                onClose={() => {
                    nulifyFiles()
                }}>
            <svg className={cl.cross} onClick={() => {
                nulifyFiles()
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
                    files.map((file) => {
                        uploadFile(file)
                    })
                    dialog.current.close()
                }}>
                <Files files={files}/>
                <AddFiles/>
            </form>
        </dialog>
    );
};

export default DialogDnD;