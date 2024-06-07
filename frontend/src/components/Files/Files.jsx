import React from 'react';
import File from "../File/File";
import cl from './Files.module.css'

const Files = ({files}) => {
    return (
        <div className={cl.filesList}>
            {files.map(file =>
                <File file={file}/>
            )}
        </div>
    );
};

export default Files;