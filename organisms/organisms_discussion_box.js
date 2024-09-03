import React from 'react'
import AtomsText from '../atoms/atoms_text';
import MoleculesRoleBox from '../molecules/molecules_role_box';

import style from './organisms.module.css'

export default function OrganismsDiscussionBox(props) {
    return (
        <div className={style.discussion_box} >
            <div className="p-0 m-0">
                <div className="d-inline-block position-relative me-2">
                    <img className="img-profile" src="/images/default/default_admin.png" alt="username-profile-pic.png"></img>
                </div>
                <div className="d-inline-block position-relative">
                    <AtomsText body={props.created_by ? <>@{props.created_by}</> : 'Unknown User'} text_type="mini_sub_heading"/>
                    <MoleculesRoleBox role={props.role} date={props.created_at}/>
                </div>
            </div>
            <AtomsText body={props.body} text_type="main_content"/>
        </div>
    );
}
  