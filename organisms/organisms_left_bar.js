import { faSignIn } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Link from 'next/link'
import { useEffect, useState } from 'react';
import AtomsText from '../atoms/atoms_text';
import { ucEachWord, ucFirst } from '../modules/helpers/typography'
import { getLocal } from '../modules/storages/local';

import style from './organisms.module.css'
import OrganismsLogin from './organisms_login';

export default function OrganismsLeftBar(props) {
    const getActive = (val, curr) => {
        if(val == curr){
            return "nav-item active"
        } else {
            return "nav-item"
        }
    }

    const collection = [
        {
            link: "",
            title: "Introduction",
            desc: "Lorem ipsum",
            section: null
        },
        {
            link: "story",
            title: "Story",
            desc: "Lorem ipsum",
            section: "story"
        },
        {
            link: "storylines",
            title: "Storylines",
            desc: "Lorem ipsum",
            section: "story"
        },
        {
            link: "aircraft",
            title: "Aircraft",
            desc: "Lorem ipsum",
            section: "stats"
        },
        {
            link: "ships",
            title: "Ships",
            desc: "Lorem ipsum",
            section: "stats"
        },
        {
            link: "vehicles",
            title: "Vehicles",
            desc: "Lorem ipsum",
            section: "stats"
        },
        {
            link: "weapons",
            title: "Weapons",
            desc: "Lorem ipsum",
            section: "stats"
        },
        {
            link: "facilities",
            title: "Facilities",
            desc: "Lorem ipsum",
            section: "stats"
        },
        {
            link: "casualities",
            title: "Casualities",
            desc: "Lorem ipsum",
            section: "stats"
        },
        {
            link: "events",
            title: "Events",
            desc: "Lorem ipsum",
            section: "stats"
        },
        {
            link: "books",
            title: "Books",
            desc: "Lorem ipsum",
            section: "stats"
        },
        {
            link: "my",
            title: "My Content",
            desc: "Lorem ipsum",
            section: "manage"
        },
        {
            link: "help",
            title: "Help",
            desc: "Lorem ipsum",
            section: null
        },
        {
            link: "about",
            title: "About Us",
            desc: "Lorem ipsum",
            section: null
        }
    ]
    let dividerBefore = false

    function getNavButtonTemplate(link, title, desc){
        return <Link href={`/${link}`}>
            <li className={getActive(props.active, link)} style={{listStyleType: "none"}}>
                <div className="nav-link">
                    <div className='row'>
                        <div className='col-3'>
                            <img className="img-profile" src={`/images/${link != '' ? link : 'intro'}.png`} alt={`${link}.png`}></img>
                        </div>
                        <div className='col-9'>
                            <AtomsText body={ucEachWord(title)} text_type="mini_sub_heading"/>
                            <AtomsText body={desc} text_type="mini_sub_heading"/>
                        </div>
                    </div>
                </div>
            </li>
        </Link>
    }

    const [userToken, setUserToken] = useState(null)
    const [username, setUsername] = useState(null)
    const [role, setRole] = useState(null)

    useEffect(() => {
        setUserToken(getLocal('token_key'))
        setUsername(getLocal('username'))
        setRole(getLocal('role'))
    },[])

    return (
        <>
            <div className="nav-new-holder">
                {
                    collection.map((val, i, index) => {
                        if(val.section == null && i == 0){
                            dividerBefore = false
                            return <>
                                {
                                    userToken ?
                                        <Link href={`profile`}>
                                            <div className={style.profile_box}>
                                                <div className='d-flex justify-content-start'>
                                                    <div className="d-inline-block position-relative me-2">
                                                        <img className="img-profile" src="/images/default/default_admin.png" alt="username-profile-pic.png"></img>
                                                    </div>
                                                    <div className="d-inline-block position-relative">
                                                        <AtomsText body={username} text_type="mini_sub_heading"/>
                                                        <AtomsText body={ucFirst(role)} text_type="mini_sub_heading"/>
                                                    </div>
                                                </div>
                                            </div>
                                        </Link>
                                    :
                                        <button className={style.profile_box} data-bs-target="#login-form-modal" data-bs-toggle="modal">
                                            <AtomsText body={<div className='text-white'><FontAwesomeIcon icon={faSignIn}/> Sign In</div>} text_type="sub_heading"/>
                                            <AtomsText body="To get access of manage data" text_type="mini_sub_heading"/>
                                        </button>
                                }
                                
                                { getNavButtonTemplate(val.link, val.title, val.desc) }
                            </>
                        } else if (val.section != null) {
                            dividerBefore = false
                            return <>
                                { getNavButtonTemplate(val.link, val.title, val.desc) }
                            </>
                        } else if (val.section == null && dividerBefore) {
                            dividerBefore = false
                            return <>
                                { getNavButtonTemplate(val.link, val.title, val.desc) }
                            </>
                        } else {
                            dividerBefore = true
                            return <>
                                <hr className='navbar-divider-line'></hr>
                                { getNavButtonTemplate(val.link, val.title, val.desc) }
                            </>
                        }
                    })
                }
            </div>
            <OrganismsLogin/>
        </>
    )
}