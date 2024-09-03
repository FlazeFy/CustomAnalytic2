import React from 'react'
import style from './molecules.module.css'
import { ucFirst } from '../modules/helpers/typography'
import { convertDatetime } from '../modules/helpers/converter'

export default function MoleculesRoleBox({role, date}) {
    return (
        <h6 className="event-subtitle mt-3">
            {
                role == "creator" || role == "admin" ? 
                <span className={style.role_box} style={{background:"var(--secondaryBG)"}}>{ucFirst(role)}</span>
                : role == "visitor" ?
                <span className={style.role_box} style={{background:"var(--primaryBG)"}}>{ucFirst(role)}</span>
                : 
                <span className={style.role_box} style={{background:"var(--dangerBG)"}}>Unknown Role</span>
            }    
        <span className='ms-2'>Posted at {convertDatetime(date,'calendar')}</span></h6>
    );
}