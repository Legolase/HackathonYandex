import React from 'react';
import {useFilesStore} from "../../store/FilesStore";
import cl from './AddFiles.module.css'

const AddFiles = () => {


    const addFiles = useFilesStore(state => state.addFiles)

    const handleChangeAddFiles = (e) => {
        e.preventDefault()
        if (e.target.files.length > 0)
            addFiles(e.target.files)
    }


    return (
        <div className={cl.adder}>
            <label className={cl.label} htmlFor={'pretty_upload'}>
                    Add files
            </label>
            <input style={{display: 'none'}} multiple={true} type={"file"} id={'pretty_upload'} onChange={(e) => {
                handleChangeAddFiles(e)
            }}/>
            <button className={cl.label} type={"submit"}>Submit</button>
        </div>
    );
};

export default AddFiles;