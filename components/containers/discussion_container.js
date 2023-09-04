import React from 'react'

import container from './containers.module.css'

//Font awesome classicon
import { library } from "@fortawesome/fontawesome-svg-core"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { } from "@fortawesome/free-solid-svg-icons"

export default function GetDiscussionContainer({props}) {
    return (
        <div className={container.discussion_box}>
            <div className="p-0 m-0">
                <div className="d-inline-block position-relative me-2">
                    <img className={container.story_creator_image} src="/images/default/default_admin.png" alt="username-profile-pic.png"></img>
                </div>
                <div className="d-inline-block position-relative">
                    <h6 className="event-title">@{props.username}</h6>
                
                </div>
            </div>
            <p>{props.body}</p>
        </div>
    );
}
  