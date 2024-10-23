import { useState, useEffect } from "react"

// Font awesome classicon
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFloppyDisk, faGear} from "@fortawesome/free-solid-svg-icons"

// Components
import MoleculesProfileImgBox from "../../../molecules/molecules_profile_img_box"
import Swal from "sweetalert2"
import { convertDatetime } from "../../../modules/helpers/converter"
import { getLocal } from "../../../modules/storages/local"
import MoleculesAlertBox from "../../../molecules/molecules_alert_box"
import AtomsText from "../../../atoms/atoms_text"
import AtomsBreakLine from "../../../atoms/atoms_breakline"
import AtomsButtonIconTitle from "../../../atoms/atoms_button_icon_title"

export default function GetProfileInfo(props) {
    //Initial variable
    const [is_edit, setEditData] = useState(false)
    //Initial variable
    const [error, setError] = useState(null)
    const [dataStatus, setDataStatus] = useState(null)
    const [isLoaded, setIsLoaded] = useState(false)
    const [userToken, setUserToken] = useState(null)
    const [items, setItems] = useState([])

    useEffect(() => {
        Swal.showLoading()
        setUserToken(getLocal('token_key'))
        
        fetch(`http://127.0.0.1:8000/api/user/my`, {
            method: 'GET',
            headers: {
                Authorization: `Bearer ${userToken}`
            }
        })
        .then(res => res.json())
            .then(
            (result) => {
                Swal.close()
                setIsLoaded(true)
                setDataStatus(null)
                setError(null)
                setItems(result.data)
            },
            (error) => {
                Swal.close()
                Swal.fire({
                    icon: "error",
                    title: "Oops...",
                    text: "Something went wrong!",
                })
                setError(error)
            }
        )
    },[userToken])

    const editProfileDataModal = () => {
        if (is_edit == true) {
            setEditData(false)
        } else {
            setEditData(true)
        }
    }

    if (error) {
        return <MoleculesAlertBox message={error.message} type='danger' context={props.ctx}/>
    } else if (!isLoaded) {
        return (
            <div>
                <h5 className='text-center text-white mt-2 fst-italic'>Loading...</h5>
            </div>
        )
    } else {
        return (
            <div className="row">
                <div className="col-5">
                    <MoleculesProfileImgBox image_url={items.image_url}/>
                </div>
                <div className="col-7 position-relative">
                    {
                        <>
                            {
                                is_edit != true ?
                                    <>
                                        <AtomsText text_type="main_heading" body={'@'+items.username}/>
                                        <AtomsText text_type="sub_heading" body={items.fullname}/>
                                        <AtomsBreakLine length={1}/>
                                        <AtomsText text_type="sub_heading" body='Biography'/>
                                        <AtomsText text_type="main_content" body={items.bio}/>
                                    </>
                                :
                                    <>
                                        <div class="form-floating mb-3">
                                            <input type="text" className="form-control text-white" id="floatingInput" style={{width:"80%"}} value={items.username} placeholder="username"/>
                                            <label for="floatingInput">Username</label>
                                        </div>
                                        <div class="form-floating mb-3">
                                            <input type="text" className="form-control text-white" id="floatingInput" style={{width:"80%"}} value={items.fullname} placeholder="fullname"/>
                                            <label for="floatingInput">Fullname</label>
                                        </div>
                                        <div class="form-floating">
                                            <textarea class="form-control" placeholder="Leave about you here" id="floatingTextarea" style={{width:"80%", minHeight:"120px"}}>{items.bio}</textarea>
                                            <label for="floatingTextarea">Bio</label>
                                        </div>
                                    </>
                            }
                            <AtomsBreakLine length={1}/>
                            <div className="fst-italic">
                                <AtomsText text_type="mini_sub_heading" body={`Joined at : ${convertDatetime(items.created_at,'calendar')}`}/>
                                <AtomsText text_type="mini_sub_heading" body={items.updated_at ? `Last updated at : ${convertDatetime(items.updated_at,'calendar')}`:'Last updated at : -'}/>
                            </div>
                        </>
                    }
                    <div style={{position:"absolute", right:0, top:0}}>
                        {
                            is_edit == true ?
                                <AtomsButtonIconTitle title="Save Changes" type="icon" ctx={<FontAwesomeIcon icon={faFloppyDisk}/>} id="editInfoData" action={editProfileDataModal}/>
                            :
                                <AtomsButtonIconTitle title="Edit Profile" type="icon" ctx={<FontAwesomeIcon icon={faGear}/>} id="editInfoData" action={editProfileDataModal}/>
                        }
                    </div>
                </div>
            </div>    
        )
    }
}