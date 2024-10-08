import React from 'react'
import style from './templates.module.css'

//Font awesome classicon
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEdit, faXmark } from "@fortawesome/free-solid-svg-icons"

export default function TemplateManageModal({builder, items, id}) {
    return (
        <>
            <button className={style.manage_btn} data-bs-toggle="modal" data-bs-target={"#manageModal"+id}><FontAwesomeIcon icon={faEdit}/></button>
            <div className="modal fade" id={"manageModal"+id} tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLabel">Manage</h5>
                            <button type="button" className="btn-close-modal" data-bs-dismiss="modal" aria-label="Close"><FontAwesomeIcon icon={faXmark}/></button>
                        </div>
                        <div className="modal-body">
                            {
                                builder.map((build, idx) => {
                                    if(build['object_name'] != null && build['object_name'] != "period"){
                                        return (
                                            <div key={idx}>
                                                <label style={{color:"var(--primaryBG)"}}>{build['column_name']}</label>
                                                <input className='form-control mb-2' defaultValue={items[build['object_name']]}></input>
                                            </div>
                                        );
                                    }
                                })
                            }
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-danger" data-bs-toggle="modal" data-bs-target={"#deleteModal"+id}>Delete</button>
                            <div className="modal fade" id={"deleteModal"+id} tabIndex="1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                                <div className="modal-dialog">
                                    <div className="modal-content">
                                        <div className="modal-header">
                                            <h5 className="modal-title" id="exampleModalLabel">Delete data</h5>
                                            <button type="button" className="btn-close-modal" data-bs-dismiss="modal" aria-label="Close"><FontAwesomeIcon icon={faXmark}/></button>
                                        </div>
                                        <div className="modal-body">
                                            <p>Are you sure want to delete this data?</p>
                                        </div>
                                        <div className="modal-footer">
                                            <button type="button" className="btn btn-danger">Delete</button>
                                            <button type="button" className="btn btn-primary">Save Changes</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <button type="button" className="btn btn-primary">Save Changes</button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
  