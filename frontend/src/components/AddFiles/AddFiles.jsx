import React from 'react';
import {useFilesStore} from "../../store/FilesStore";

const AddFiles = () => {



    const addFiles = useFilesStore(state => state.addFiles)

    const handleChangeAddFiles = (e) => {
        e.preventDefault()
        if (e.target.files.length > 0)
            addFiles(e.target.files)
    }


    return (
        <div style={{display: "flex", gap: '10px'}}>
            <label className={'input-file'} style={{position: 'relative', display: 'inline-block'}}>
                <input multiple={true} type={"file"} name={'file'} onChange={(e) => {
                    handleChangeAddFiles(e)
                }}/>
            </label>
            <button type={"submit"}>Submit</button>
        </div>
    );
};

export default AddFiles;