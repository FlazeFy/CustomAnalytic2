import React from 'react'

import button from './buttons.module.css'

export default function GetButtonIconTitle({title, type, ctx}) {
    return (
        <button className={button.btn_icon_title}>
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
  