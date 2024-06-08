import React from 'react';
import cl from './Search.module.css'
import {useContactsStore} from "../../../store/ContactsStore";

const Search = () => {

    const sq = useContactsStore(state => state.searchQuery)
    const setQuery = useContactsStore(state => state.setQuery)

    const nulify = useContactsStore(state => state.nulify)
    const contactAndUserSearch = useContactsStore(state => state.contactAndUserSearch)

    const setQueryCurrent = (e) => {
        setQuery(e.target.value)
        if (!e.target.value){
            nulify()
        } else {
            contactAndUserSearch()
        }
    }

    return (
        <div className={cl.search}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                    d="M20.0311 20.79C20.4911 21.25 21.2011 20.54 20.7411 20.09L16.9911 16.33C18.3065 14.8745 19.0336 12.9818 19.0311 11.02C19.0311 6.63 15.4611 3.06 11.0711 3.06C6.68108 3.06 3.11108 6.63 3.11108 11.02C3.11108 15.41 6.68108 18.98 11.0711 18.98C13.0511 18.98 14.8811 18.25 16.2811 17.04L20.0311 20.79ZM4.11008 11.02C4.11008 7.18 7.24008 4.06 11.0701 4.06C14.9101 4.06 18.0301 7.18 18.0301 11.02C18.0301 14.86 14.9101 17.98 11.0701 17.98C7.24008 17.98 4.11008 14.86 4.11008 11.02Z"
                    fill="gray"/>
            </svg>
            <input className={cl.input} placeholder={'Search'} value={sq} onChange={setQueryCurrent}/>
        </div>
    );
};

export default Search;