import React from 'react'

//Font awesome classicon
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faStar } from "@fortawesome/free-solid-svg-icons"
import { convertDatetime } from '../modules/helpers/converter';

export default function MoleculesFeedbackRate({rate, date}) {
    const elmt = [];

    for (let i = 0; i < rate; i++) {
      elmt.push(<FontAwesomeIcon icon={faStar} color="var(--warningBG)"/>);
    }

    return (
        <h6 className="event-subtitle">
            {
                elmt.map((val, i, index)=> {
                    return val
                })
            }    
        <span className='ms-2'>Posted at {convertDatetime(date,'calendar')}</span></h6>
    );
}
  