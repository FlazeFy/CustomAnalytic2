import { useState, useEffect } from "react"
import Head from 'next/head'
import styles from '../../styles/Home.module.css'
import Navbar from "../../components/navbar/new_navbar"

//Font awesome classicon
import { library } from "@fortawesome/fontawesome-svg-core"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faGithub, faInstagram, faLinkedin } from "@fortawesome/free-brands-svg-icons"
import { faEnvelope, faGlobe } from "@fortawesome/free-solid-svg-icons"

export default function AboutMe() {
    //Initial variable
    const [error, setError] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const [itemsUsers, setItemsUsers] = useState([]);
    const [itemsSocial, setItemsSocial] = useState([]);
    var chart = [];

    useEffect(() => {
        fetch("https://leonardhors.site/api/user")
        .then(res => res.json())
            .then(
            (result) => {
                setIsLoaded(true);
                setItemsUsers(result);
            },
            (error) => {
                setIsLoaded(true);
                setError(error);
            }
        )
    },[])

    useEffect(() => {
        fetch("https://leonardhors.site/api/social")
        .then(res => res.json())
            .then(
            (result) => {
                setIsLoaded(true);
                setItemsSocial(result);
            },
            (error) => {
                setIsLoaded(true);
                setError(error);
            }
        )
    },[])

    return (
        <div style={{background:"#181818"}} >
            <Head>
                <title>WorldWarII | About Me</title>
                <meta name="description" content="Generated by create next app" />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <main className={styles.main}>                
                <div className="content">
                    <div className="row">
                        <div className="col-3">
                            <Navbar active={"about"}/>
                        </div>
                        <div className="col-9">
                            <h3 className="text-title">About Me</h3>
                            <div className="row mt-4">
                                <div className="col-lg-3 text-center">
                                    <img className="img img-fluid rounded-circle" src="" width="125" height="125" />
                                </div>
                                <div className="col-lg-9 text-start pt-2">
                                    {
                                        itemsUsers.map((val, i, index) => {
                                            return (
                                                <div key={i} className="text-white">
                                                    <h5>Hello there ????, { val.greeting_bio }. { val.mini_bio }</h5>
                                                    <p>{ val.long_bio }</p>
                                                </div>
                                            )
                                        })
                                    }
                                </div>
                            </div>   
                            <h3 className="text-title">How to reach me</h3>
                            <div>
                                {
                                    itemsSocial.map((val, i, index) => {
                                        return (
                                            <>
                                                <a class="btn btn-icon social" title="Github" href={val.github}><FontAwesomeIcon icon={faGithub}/></a>
                                                <a class="btn btn-icon social" title="Personal Website" href="https://leonardhors.site"><FontAwesomeIcon icon={faGlobe}/></a>
                                                <a class="btn btn-icon social" title="Linked In" href={val.linkedin}><FontAwesomeIcon icon={faLinkedin}/></a>
                                                <a class="btn btn-icon social" title="Instagram" href={val.instagram}><FontAwesomeIcon icon={faInstagram}/></a>
                                                <a class="btn btn-icon social" title="Email" href={"mailto: "+val.email}><FontAwesomeIcon icon={faEnvelope}/></a>
                                            </>
                                        )
                                    })
                                }
                               
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    )
}