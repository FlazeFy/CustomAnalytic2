import React from 'react'
import container from './containers.module.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUpload, faUser, faXmark } from "@fortawesome/free-solid-svg-icons"
import AtomsButtonIconTitle from '../../atoms/atoms_button_icon_title'

export default function GetProfileImgContainer(props) {
    return (
        <>
            <button className={container.profile_img_box} data-bs-toggle="modal" data-bs-target={"#editProfileImageModal"} title="Manage Profile Image">
                <img src={props.image_url}></img>
            </button>
            <div className="modal fade" id={"editProfileImageModal"} tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLabel">Edit Profile Image</h5>
                            <button type="button" className="btn-close-modal" data-bs-dismiss="modal" aria-label="Close"><FontAwesomeIcon icon={faXmark}/></button>
                        </div>
                        <div className="modal-body">
                            <div className='row'>
                                <div className='col-4'>
                                    <AtomsButtonIconTitle title="Upload Image" type="icon" ctx={<FontAwesomeIcon icon={faUpload}/>}/>
                                </div>
                                <div className='col-4'>
                                    <AtomsButtonIconTitle title="Set Avatar" type="icon" ctx={<FontAwesomeIcon icon={faUser}/>}/>
                                </div>
                                <div className='col-4'>
                                    <AtomsButtonIconTitle title="Remove Image" type="icon" ctx={<FontAwesomeIcon icon={faXmark}/>}/>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
  