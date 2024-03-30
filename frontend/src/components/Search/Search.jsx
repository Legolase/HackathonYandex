import React from 'react';
import cl from './Search.module.css'
const Search = () => {
    return (
        <div className={cl.search}>
            <input className={cl.input} placeholder={'Search'}/>
        </div>
    );
};

export default Search;