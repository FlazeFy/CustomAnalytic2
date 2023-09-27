import React from 'react'
import others from './others.module.css'
import { ucFirst } from '../../modules/helpers/typography'
import { getLocal, storeLocal } from '../../modules/storages/local'

//Font awesome classicon
import { library } from "@fortawesome/fontawesome-svg-core"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons"

export default function GetSearchBox({placeholder, ctx}) {
    function setSessionSearch(key, val){
        storeLocal(key + "_search_sess",val)  
        location.reload()
    }

    return (
        <div className={others.search_holder}>
            <input className={'form-control '+ others.search_bar} placeholder={ucFirst(placeholder)} defaultValue={getLocal(ctx + "_search_sess") != null ? getLocal(ctx + "_search_sess") : null} 
                onBlur={(e) => setSessionSearch(ctx, e.target.value)} onKeyDown={(e) => e.key === 'Enter' ? setSessionSearch(ctx, e.target.value) : null} /> 
            <FontAwesomeIcon className={others.search_icon} icon={faMagnifyingGlass} color="var(--secondaryBG)"/>
        </div>
    );
}