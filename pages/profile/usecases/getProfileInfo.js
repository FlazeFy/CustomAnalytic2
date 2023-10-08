import GetProfileImgContainer from "../../../components/containers/profile_img_container"

export default function GetProfileInfo({ctx}) {
    const builder = {
        profile_img: '/images/default/default_content.jpg',
        username: "flazefy",
        fullname: "Leonardho R. Sitanggang",
        role: "creator",
        email: "flazen.edu@gmail.com",
        email_verified_at: "2023-07-29 13:10:00"
    }
    
    return (
        <> 
            <GetProfileImgContainer items={builder}/>
        </>
    )
}