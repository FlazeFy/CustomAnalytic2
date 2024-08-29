import React from 'react'

import container from './containers.module.css'

import GetRoleBox from '../others/roleBox'

export default function GetDiscussionContainer({props}) {
    return (
        <div className={container.discussion_box} >
            <div className="p-0 m-0">
                <div className="d-inline-block position-relative me-2">
                    <img className="img-profile" src="/images/default/default_admin.png" alt="username-profile-pic.png"></img>
                </div>
                <div className="d-inline-block position-relative">
                    <h6 className="event-title">@{props.username}</h6><p></p>
                    <GetRoleBox role={props.role} date={props.created_at}/>
                </div>
            </div>
            <p>{props.body}</p>
        </div>
    );
}
  