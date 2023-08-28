import React from 'react'

import container from './containers.module.css'

//Font awesome classicon
import { library } from "@fortawesome/fontawesome-svg-core"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { } from "@fortawesome/free-solid-svg-icons"

export default function GetStoryContainer({}) {
    return (
        <div className={container.story_box}>
            <span className={container.story_type}>Battle</span>
            <img src="/images/default/default_content.jpg"></img>
            <div className={container.box_body}>
                <h2>Battle of the Somme</h2>
                <p>The Battle of the Somme, also known as the Somme offensive, was a battle of the First World War fought by the armies of the British Empire and the French Third Republic against the German Empire. It took place between 1 July and 18 November 1916 on both sides of the upper reaches of the river Somme in France.</p>
                <div className="p-0 m-0">
                    <div className="d-inline-block position-relative me-2">
                        <img className={container.story_creator_image} src="/images/default/default_admin.png" alt="username-profile-pic.png"></img>
                    </div>
                    <div className="d-inline-block position-relative">
                        <h6 className="event-title">@Flazefy</h6>
                        <h6 className="event-subtitle">Posted at ...</h6>
                    </div>
                </div>
            </div>
        </div>
    );
}
  