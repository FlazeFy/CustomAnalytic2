import { useState, useEffect } from "react"

// Font awesome classicon
import { library } from "@fortawesome/fontawesome-svg-core"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFloppyDisk, faGear, faWarning } from "@fortawesome/free-solid-svg-icons"

// Components
import GetProfileImgContainer from "../../../components/containers/profile_img_container"
import GetButtonIconTitle from "../../../components/buttons/button_icon_title"
import Swal from "sweetalert2"
import { getCleanTitleFromCtx } from "../../../modules/helpers/converter"
import { getLocal } from "../../../modules/storages/local"
import MoleculesAlertBox from "../../../molecules/molecules_alert_box"

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

    function editProfileDataModal(){
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
                    <GetProfileImgContainer image_url={items.image_url}/>
                </div>
                <div className="col-7 position-relative">
                    {
                        is_edit != true ?
                            <>
                                <h2 className="text-white">@{items.username}</h2>
                                <h5 className="text-white">{items.fullname}</h5>
                                <br></br>
                                <p>{items.bio}</p>
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
                    <div style={{position:"absolute", right:0, top:0}}>
                        {
                            is_edit == true ?
                                <GetButtonIconTitle title="Save Changes" type="icon" ctx={<FontAwesomeIcon icon={faFloppyDisk}/>} id="editInfoData" action={editProfileDataModal}/>
                            :
                                <GetButtonIconTitle title="Edit Profile" type="icon" ctx={<FontAwesomeIcon icon={faGear}/>} id="editInfoData" action={editProfileDataModal}/>
                        }
                    </div>
                </div>
            </div>    
        )
    }
}