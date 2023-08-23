import Link from 'next/link'
import Image from 'next/image'

//Font awesome icon
import { library } from "@fortawesome/fontawesome-svg-core"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {  } from "@fortawesome/free-solid-svg-icons"

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
            link: "about",
            title: "About Me",
            desc: "Lorem ipsum",
            section: null
        }
    ]

    function getNavButtonTemplate(link, title, desc){
        return <Link href={`/${link}`}>
            <li className={getActive(props.active, link)} style={{listStyleType: "none"}}>
                <div className="nav-link">
                    <div className='row'>
                        <div className='col-3'>
                            {/* ... */}
                        </div>
                        <div className='col-9'>
                            <h5>{title}</h5>
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
                    if(val.section != null || i == 0){
                        return getNavButtonTemplate(val.link, val.title, val.desc)
                    } else {
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