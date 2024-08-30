import React from 'react'

import button from './atoms.module.css'

export default function AtomsButtonIconTitle({title, type, ctx, id, action}) {
    return (
        <button className={button.btn_icon_title} id={id} onClick={action}>
            {
                type == "img" ?
                    <img></img>
                : 
                    ctx
            }
            <h6>{title}</h6>
        </button>
    );
}
  