import { useState, useEffect } from "react"
import Head from 'next/head'
import styles from '../../styles/Home.module.css'
import Navbar from "../../components/navbar"

//Font awesome icon
import { library } from "@fortawesome/fontawesome-svg-core"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faDownload } from "@fortawesome/free-solid-svg-icons"
import TotalDeathByCountry from "../../components/columnChart/totalDeathByCountry"

export default function Casualities() {
    return (
        <div style={{background:"#F2F8FF"}} >
            <Head>
                <title>WorldWarII | Casualities</title>
                <meta name="description" content="Generated by create next app" />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <main className={styles.main}>
                <Navbar active={"events"}/>
                
                <div className="content">
                    <div className="row">
                        <div className="col-lg-6 col-md-6 col-sm-12">
                            <TotalDeathByCountry/>
                        </div>
                        <div className="col-lg-6 col-md-6 col-sm-12">
                            
                        </div>
                    </div>
                </div>
            </main>
        </div>
    )
}