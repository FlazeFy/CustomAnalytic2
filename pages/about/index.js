import { useState, useEffect } from "react"
import Head from 'next/head'
import about from './about.module.css'
import Navbar from "../../components/navbar/left_bar"

//Font awesome classicon
import { library } from "@fortawesome/fontawesome-svg-core"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faGithub, faInstagram, faLinkedin } from "@fortawesome/free-brands-svg-icons"
import { faEnvelope, faGlobe } from "@fortawesome/free-solid-svg-icons"
import GetAllContributor from "./usecases/getAllContributor"

export default function AboutUs() {
    return (
        <div style={{background:"#181818"}} >
            <Head>
                <title>WorldWarII | About Us</title>
                <meta name="description" content="Generated by create next app" />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <main className="main">                
                <div className="content">
                    <div className="row">
                        <div className="col-3">
                            <Navbar active={"about"}/>
                        </div>
                        <div className="col-9">
                            <GetAllContributor/>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    )
}