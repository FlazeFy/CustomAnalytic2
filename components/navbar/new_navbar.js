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

    return (
        <div className="nav-new-holder">
            <Link href="/intro">
                <li className={getActive(props.active, "intro")} style={{listStyleType: "none"}}>
                    <div className="nav-link">
                        <div className='row'>
                            <div className='col-3'>

                            </div>
                            <div className='col-9'>
                                <h5>Introduction</h5>
                                <h6>lorem ipsum</h6>
                            </div>
                        </div>
                    </div>
                </li>
            </Link>
            <Link href="/aircraft">
                <li className={getActive(props.active, "aircraft")} style={{listStyleType: "none"}}>
                    <div className="nav-link">
                        <div className='row'>
                            <div className='col-3'>

                            </div>
                            <div className='col-9'>
                                <h5>Aircraft</h5>
                                <h6>lorem ipsum</h6>
                            </div>
                        </div>
                    </div>
                </li>
            </Link>
            <Link href="/ships">
                <li className={getActive(props.active, "ships")} style={{listStyleType: "none"}}>
                    <div className="nav-link">
                        <div className='row'>
                            <div className='col-3'>

                            </div>
                            <div className='col-9'>
                                <h5>Ships</h5>
                                <h6>lorem ipsum</h6>
                            </div>
                        </div>
                    </div>
                </li>
            </Link>
            <Link href="/vehicles">
                <li className={getActive(props.active, "vehicles")} style={{listStyleType: "none"}}>
                    <div className="nav-link">
                        <div className='row'>
                            <div className='col-3'>

                            </div>
                            <div className='col-9'>
                                <h5>Vehicles</h5>
                                <h6>lorem ipsum</h6>
                            </div>
                        </div>
                    </div>
                </li>
            </Link>
            <Link href="/weapons">
                <li className={getActive(props.active, "weapons")} style={{listStyleType: "none"}}>
                    <div className="nav-link">
                        <div className='row'>
                            <div className='col-3'>

                            </div>
                            <div className='col-9'>
                                <h5>Weapons</h5>
                                <h6>lorem ipsum</h6>
                            </div>
                        </div>
                    </div>
                </li>
            </Link>
            <Link href="/facilities">
                <li className={getActive(props.active, "facilities")} style={{listStyleType: "none"}}>
                    <div className="nav-link">
                        <div className='row'>
                            <div className='col-3'>

                            </div>
                            <div className='col-9'>
                                <h5>Facilities</h5>
                                <h6>lorem ipsum</h6>
                            </div>
                        </div>
                    </div>
                </li>
            </Link>
            <Link href="/casualities">
                <li className={getActive(props.active, "casualities")} style={{listStyleType: "none"}}>
                    <div className="nav-link">
                        <div className='row'>
                            <div className='col-3'>

                            </div>
                            <div className='col-9'>
                                <h5>Casualities</h5>
                                <h6>lorem ipsum</h6>
                            </div>
                        </div>
                    </div>
                </li>
            </Link>
            <Link href="/events">
                <li className={getActive(props.active, "events")} style={{listStyleType: "none"}}>
                    <div className="nav-link">
                        <div className='row'>
                            <div className='col-3'>

                            </div>
                            <div className='col-9'>
                                <h5>Events</h5>
                                <h6>lorem ipsum</h6>
                            </div>
                        </div>
                    </div>
                </li>
            </Link>
            <Link href="/books">
                <li className={getActive(props.active, "books")} style={{listStyleType: "none"}}>
                    <div className="nav-link">
                        <div className='row'>
                            <div className='col-3'>

                            </div>
                            <div className='col-9'>
                                <h5>Books</h5>
                                <h6>lorem ipsum</h6>
                            </div>
                        </div>
                    </div>
                </li>
            </Link>
            <hr className='navbar-divider-line'></hr>
            <Link href="/about">
                <li className={getActive(props.active, "about")} style={{listStyleType: "none"}}>
                    <div className="nav-link">
                        <div className='row'>
                            <div className='col-3'>

                            </div>
                            <div className='col-9'>
                                <h5>About Me</h5>
                                <h6>lorem ipsum</h6>
                            </div>
                        </div>
                    </div>
                </li>
            </Link>
        </div>
    )
}