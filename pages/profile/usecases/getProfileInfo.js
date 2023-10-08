import { useState, useEffect } from "react"

// Font awesome classicon
import { library } from "@fortawesome/fontawesome-svg-core"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFloppyDisk, faGear } from "@fortawesome/free-solid-svg-icons"

// Components
import GetProfileImgContainer from "../../../components/containers/profile_img_container"
import GetButtonIconTitle from "../../../components/buttons/button_icon_title"

export default function GetProfileInfo() {
    //Initial variable
    const [is_edit, setEditData] = useState(false)

    const builder = {
        profile_img: '/images/default/default_content.jpg',
        username: "flazefy",
        bio: "lorem ipsum",
        fullname: "Leonardho R. Sitanggang",
        role: "creator",
        email: "flazen.edu@gmail.com",
        email_verified_at: "2023-07-29 13:10:00"
    }

    function editProfileDataModal(){
        if (is_edit == true) {
            setEditData(false)
        } else {
            setEditData(true)
        }
    }
    
    return (
        <div className="row">
            <div className="col-5">
                <GetProfileImgContainer items={builder}/>
            </div>
            <div className="col-7 position-relative">
                {
                    is_edit != true ?
                        <>
                            <h2 className="text-white">@{builder['username']}</h2>
                            <h5 className="text-white">{builder['fullname']}</h5>
                            <br></br>
                            <p>{builder['bio']}</p>
                        </>
                    :
                        <>
                            <div class="form-floating mb-3">
                                <input type="text" className="form-control text-white" id="floatingInput" style={{width:"80%"}} value={builder['username']} placeholder="username"/>
                                <label for="floatingInput">Username</label>
                            </div>
                            <div class="form-floating mb-3">
                                <input type="text" className="form-control text-white" id="floatingInput" style={{width:"80%"}} value={builder['fullname']} placeholder="fullname"/>
                                <label for="floatingInput">Fullname</label>
                            </div>
                            <div class="form-floating">
                                <textarea class="form-control" placeholder="Leave about you here" id="floatingTextarea" style={{width:"80%", minHeight:"120px"}}>{builder['bio']}</textarea>
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