import React from 'react'
import others from './others.module.css'
import { ucFirst } from '../../modules/helpers/typography';

export default function GetRoleBox({role, date}) {
    return (
        <h6 className="event-subtitle">
            {
                role == "creator" ? 
                <span className={others.role_box} style={{background:"var(--secondaryBG)"}}>{ucFirst(role)}</span>
                : role == "visitor" ?
                <span className={others.role_box} style={{background:"var(--primaryBG)"}}>{ucFirst(role)}</span>
                : 
                <span className={others.role_box} style={{background:"var(--dangerBG)"}}>Unknown Role</span>
            }    
        <span className='ms-2'>Posted at {date}</span></h6>
    );
}