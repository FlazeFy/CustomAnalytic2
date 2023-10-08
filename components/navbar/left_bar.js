import Link from 'next/link'
import { ucEachWord } from '../../modules/helpers/typography'

import container from '../containers/containers.module.css'
import navbar from './navbar.module.css'

export default function Navbar(props) {
    function getActive(val, curr){
        if(val == curr){
            return "nav-item active";
        } else {
            return "nav-item";
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
                            {/* ... */}
                        </div>
                        <div className='col-9'>
                            <h5>{ucEachWord(title)}</h5>
                            <h6>{desc}</h6>
                        </div>
                    </div>
                </div>
            </li>
        </Link>
    }

    return (
        <div className="nav-new-holder">
            {
                collection.map((val, i, index) => {
                    if(val.section == null && i == 0){
                        dividerBefore = false
                        return <>
                            <Link href={`profile`}>
                                <>
                                <div className={navbar.profile_box}>
                                    <div className="d-inline-block position-relative me-2">
                                        <img className={container.story_creator_image} src="/images/default/default_admin.png" alt="username-profile-pic.png"></img>
                                    </div>
                                    <div className="d-inline-block position-relative">
                                        <h6 className="event-title">@Flazefy</h6>
                                        <h6 className="event-subtitle">Admin</h6>
                                    </div>
                                </div>
                                </>
                            </Link>
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
    )
}