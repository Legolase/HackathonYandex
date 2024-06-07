import React from 'react';
import cl from './FIle.module.css'

const File = ({file}) => {
    return (
        <div className={cl.file}>
            <div>
                <svg width="25" height="100%" viewBox="0 0 20 24" fill="none"
                     xmlns="http://www.w3.org/2000/svg">
                    <path fillRule="evenodd" clipRule="evenodd"
                          d="M17.27 23.4768C16.2004 24 14.8003 24 12 24H8C5.19974 24 3.79961 24 2.73005 23.4768C1.78924 23.0166 1.02433 22.2823 0.544967 21.3792C0 20.3524 0 19.0083 0 16.32V7.68C0 4.99175 0 3.64762 0.544967 2.62085C1.02433 1.71767 1.78924 0.983361 2.73005 0.523169C3.79961 0 5.19974 0 8 0H9.34903C10.3274 0 10.8166 0 11.2769 0.1061C11.6851 0.200167 12.0753 0.35532 12.4331 0.565862C12.8368 0.803334 13.1827 1.1354 13.8745 1.79954L18.1255 5.88047C18.8173 6.5446 19.1632 6.87667 19.4106 7.26419C19.6299 7.60776 19.7915 7.98233 19.8895 8.37415C20 8.81609 20 9.2857 20 10.2249V16.32C20 19.0083 20 20.3524 19.455 21.3792C18.9757 22.2823 18.2108 23.0166 17.27 23.4768ZM17.1893 9.6H11C10.4477 9.6 10 9.17019 10 8.64V2.69823C10 2.05678 10.8079 1.73554 11.2803 2.18912L17.7197 8.37088C18.1921 8.82446 17.8575 9.6 17.1893 9.6Z"
                          fill="black"/>
                </svg>
            </div>
            <div className={cl.metaInf} >
                <span className={cl.name}>{file.name}</span>
                <span className={cl.size}>{file.size} bytes</span>
            </div>
        </div>
    );
};

export default File;