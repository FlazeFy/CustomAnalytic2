import Link from 'next/link'
import Image from 'next/image'

//Font awesome icon
import { library } from "@fortawesome/fontawesome-svg-core"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBell, faComment } from "@fortawesome/free-solid-svg-icons"

export default function Navbar(props) {
    function getActive(val, curr){
        if(val == curr){
            return "nav-item active";
        } else {
            return "nav-item";
        }
    }

    return (
        <nav className="navbar navbar-expand-lg w-100">
            <div className="container-fluid">
                <Link href="/">
                    <li className="navbar-brand">World War II</li>
                </Link>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                        <Link href="/aircraft">
                            <li className={getActive(props.active, "aircraft")}>
                                <span className="nav-link" aria-current="page">Aircraft</span>
                            </li>
                        </Link>
                        <Link href="/ships">
                            <li className={getActive(props.active, "ships")}>
                                <span className="nav-link" href="#">Ships</span>
                            </li>
                        </Link>
                        <Link href="/vehicles">
                            <li className={getActive(props.active, "vehicles")}>
                                <span className="nav-link" href="#">Vehicles</span>
                            </li>
                        </Link>
                        <Link href="/weapons">
                            <li className={getActive(props.active, "weapons")}>
                                <span className="nav-link" href="#">Weapons</span>
                            </li>
                        </Link>
                        <Link href="/facilities">
                            <li className={getActive(props.active, "facilities")}>
                                <span className="nav-link" href="#">Facilities</span>
                            </li>
                        </Link>
                        <Link href="/casualities">
                            <li className={getActive(props.active, "casualities")}>
                                <span className="nav-link" href="#">Casualities</span>
                            </li>
                        </Link>
                        <Link href="/books">
                            <li className={getActive(props.active, "books")}>
                                <span className="nav-link" href="#">Books</span>
                            </li>
                        </Link>
                    </ul>
                </div>
            </div>
        </nav>
    )
}