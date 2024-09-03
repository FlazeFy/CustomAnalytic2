import React from 'react'
import style from './molecules.module.css'
import { ucFirst } from '../modules/helpers/typography'

// Toast
import AtomsToast from "../atoms/atoms_toast"
import { toast } from 'react-toastify'

//Font awesome classicon
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons"

export default function MoleculesFilterSearch({placeholder, ctx}) {
    const setSessionSearch = (key, val) => {
        sessionStorage.setItem(`Table_search_${key}`,val)  
        toast.success(<AtomsToast msg={ctx + " filtered"} />)
    }

    const getValue = (val) => {
        if(val == "%20"){
            return ""
        } else {
            return val
        }
    }

    return (
        <div className={style.search_holder}>
            <input className={'form-control '+ style.search_bar} placeholder={ucFirst(placeholder)} defaultValue={sessionStorage.getItem(`Table_search_${ctx}`) != null ? getValue(sessionStorage.getItem(`Table_search_${ctx}`)) : null} 
                onBlur={(e) => setSessionSearch(ctx, e.target.value)} onKeyDown={(e) => e.key === 'Enter' ? setSessionSearch(ctx, e.target.value) : null} /> 
            <FontAwesomeIcon className={style.search_icon} icon={faMagnifyingGlass} color="var(--secondaryBG)"/>
        </div>
    );
}