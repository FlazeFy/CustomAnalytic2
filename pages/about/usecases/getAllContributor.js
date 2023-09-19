import React from 'react'
import GetAboutContainer from '../../../components/containers/about_container'

// Component
import { getCleanTitleFromCtx } from '../../../modules/helpers/converter'

export default function GetAllContributor() {
    const items = [
        {
            fullname: "Leonardho R. Sitanggang",
            role: ["FrontEnd Developer", "BackEnd Developer", "System Analyst", "Data Analyst"],
            profile_pic: "https://media.licdn.com/dms/image/D5603AQHbKizHEv_9fQ/profile-displayphoto-shrink_800_800/0/1693052509316?e=2147483647&v=beta&t=KkSxRuRQWx_-ocgpVduxbVWQ_wgtmpetG4CbVuImB28",
            linkedin: "https://id.linkedin.com/in/leonardho-rante-sitanggang-a5a752202",
            github: "https://github.com/FlazeFy",
            instagram: "https://www.instagram.com/leonardhorante_08/",
            email: "flazen.edu@gmail.com",
            website: "leonardhors.site",
            mini_bio: "Hello there 👋, My name is Leo. I'm a Software Engineering student. Who have strong interest in web and mobile programming"
        },
        {
            fullname: "Alya Ghaitsa Rizky Pertiwi",
            role: ["FrontEnd Developer", "BackEnd Developer", "Quality Assurance"],
            profile_pic: "https://media.licdn.com/dms/image/D5603AQFg_FNatQRhEg/profile-displayphoto-shrink_800_800/0/1693368317080?e=2147483647&v=beta&t=dTjj9uRDUVL1B40fnVNaPgmqyyP2aa-2bRYdhR3DIGM",
            linkedin: "https://id.linkedin.com/in/alyaghaitsar",
            github: "https://github.com/aliyahuyy",
            instagram: "https://www.instagram.com/alyaghaitsaai_/",
            email: "alyaghaitsar@gmail.com",
            website: null,
            mini_bio: "Hi, I am interested to software development especially of UIUX and Software Quality Assurance. I like to explore and learn the new things😁🙌🏻"
        },
    ]
    
    return (
        <> 
            <h2>{getCleanTitleFromCtx("about contributor")}</h2><br></br>
            <GetAboutContainer items={items} />
        </>
    )
}
  