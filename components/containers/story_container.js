import React from 'react'

import container from './containers.module.css'
import AtomsText from '../../atoms/atoms_text'
import { ucFirst } from '../../modules/helpers/typography';

export default function GetStoryContainer(props) {
    return (
        <div className={container.story_box} onClick={(e)=>window.location.href='/story/'+props.data.slug_name}>
            <span className={container.story_type}>{ucFirst(props.data.story_type)}</span>
            <img src="/images/default/default_content.jpg"></img>
            <div className={container.box_body}>
                <AtomsText body={props.data.main_title} text_type="sub_heading"/>
                <AtomsText body={<span dangerouslySetInnerHTML={{ __html: props.data.story_detail }} />} text_type="mini_content"/>
                <div className="d-flex justify-content-start">
                    <div className="me-2 pt-1 p-0">
                        <img className="img-profile" src="/images/default/default_admin.png" alt="username-profile-pic.png"></img>
                    </div>
                    <div>
                        <AtomsText body={'@'+props.data.created_by} text_type="mini_sub_heading"/>
                        <AtomsText body={'Posted at '+props.data.created_at} text_type="mini_sub_heading"/>
                    </div>
                </div>
            </div>
        </div>
    );
}
  