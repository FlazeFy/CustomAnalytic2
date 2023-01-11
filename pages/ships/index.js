import { useState, useEffect } from "react"
import Head from 'next/head'
import styles from '../../styles/Home.module.css'
import Navbar from "../../components/navbar"

//Font awesome icon
import { library } from "@fortawesome/fontawesome-svg-core"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faDownload } from "@fortawesome/free-solid-svg-icons"
import AllShips from "../../components/table/allShips"
import TotalShipsByCountry from "../../components/barChart/totalShipsByCountry"
import TotalShipsByLaunchYear from "../../components/radarChart/totalShipsByLaunchYear"
import TotalShipsBySides from "../../components/pieChart/totalShipsBySides"

export default function Ships() {
    return (
        <div style={{background:"#F2F8FF"}} >
            <Head>
                <title>WorldWarII | Ships</title>
                <meta name="description" content="Generated by create next app" />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <main className={styles.main}>
                <Navbar active={"ships"}/>
                
                <div className="content">
                    <div className="row">
                        <div className="col-lg-4 col-md-6 col-sm-12">
                            <AllShips/>
                        </div>
                        <div className="col-lg-4 col-md-6 col-sm-12">
                           <TotalShipsByCountry/>
                        </div>
                        <div className="col-lg-4 col-md-6 col-sm-12">
                            <TotalShipsByLaunchYear/> 
                            <div className="mt-3">
                                <TotalShipsBySides/>
                            </div>                 
                        </div>
                    </div>
                </div>
            </main>
        </div>
    )
}