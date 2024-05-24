import React from 'react';
import File from "../File/File";

const Files = ({files}) => {
    return (
        <div style={{
            overflowY: 'scroll',
            maxHeight: '350px',
            display: 'flex',
            flexDirection: 'column',
            gap: '10px'
        }}>
            {files.map(file =>
                <File file={file}/>
            )}
        </div>
    );
};

export default Files;