import React from 'react'

//Font awesome classicon
import { library } from "@fortawesome/fontawesome-svg-core"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faStar } from "@fortawesome/free-solid-svg-icons"

export default function GetFeedbackRate({rate, date}) {
    const elmt = [];

    for (let i = 0; i < rate; i++) {
      elmt.push(<FontAwesomeIcon icon={faStar} color="var(--yellowBG)"/>);
    }

    return (
        <h6 className="event-subtitle">
            {
                elmt.map((val, i, index)=> {
                    return val
                })
            }    
        <span className='ms-2'>Posted at {date}</span></h6>
    );
}
  