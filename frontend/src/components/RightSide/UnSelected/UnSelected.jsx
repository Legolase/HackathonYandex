import React from 'react';
import {LogoIcon} from "../../Icon/Icon";

const UnSelected = () => {
    return (
        <div className={`right-side unselected_inactive`}>
            <div className={'auth'}>
                <LogoIcon className={'logo'}/>
                <button className={'auth-button button__white'} onSubmit={() => {
                }}>
                    Продолжить на русском
                </button>
                <span className={'desc'}>ВЕСомый мессенджер для значимого общения</span>
            </div>
        </div>
    );
};

export default UnSelected;