import React from 'react';
import cl from "./DnD.module.css";
import {useFilesStore} from "../../store/FilesStore";

const DnD = ({dialog}) => {


    const addFiles = useFilesStore(state => state.addFiles)
    const active = useFilesStore(state => state.activeBackground)
    const setActive = useFilesStore(state => state.setActiveBackground)
    const root = [cl.dnd]

    if (active) {
        root.push(cl.dnd_active)
    }

    const dragLeave = (e) => {
        e.preventDefault()
        setActive(false)
    }

    const dragDrop = (e) => {
        e.preventDefault()
        setActive(false)
        if (e.dataTransfer.files.length > 0) {
            addFiles(e.dataTransfer.files)
            dialog.current.showModal()
        }
    }
    return (
        <div className={root.join(' ')}
             onDragLeave={e => dragLeave(e)}
             onDrop={e => dragDrop(e)}
        >
        </div>
    );
};

export default DnD;