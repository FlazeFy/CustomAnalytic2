import { useState, useEffect } from "react"
import Head from 'next/head'
import styles from '../../styles/Home.module.css'
import Navbar from "../../components/navbar"

//Font awesome icon
import { library } from "@fortawesome/fontawesome-svg-core"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faDownload } from "@fortawesome/free-solid-svg-icons"
import TotalFacilitiesByType from "../../components/barChart/totalFacilitiesByType"
import TotalFacilitiesByCountry from "../../components/barChart/totalFacilitiesByCountry"
import MapChart from "../../components/mapChart/totalFacilitiesByCountry"

export default function Aircraft() {
    return (
        <div style={{background:"#F2F8FF"}} >
            <Head>
                <title>WorldWarII | Facilities</title>
                <meta name="description" content="Generated by create next app" />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <main className={styles.main}>
                <Navbar active={"facilities"}/>
                
                <div className="content">
                    <div className="row mb-2">
                        <div className="col-lg-8 col-md-6 col-sm-12">
                            <MapChart/>
                        </div>
                        <div className="col-lg-4 col-md-6 col-sm-12">

                        </div>
                    </div>
                    <div className="row">
                        <div className="col-lg-4 col-md-6 col-sm-12">
                            <TotalFacilitiesByType/>
                        </div>
                        <div className="col-lg-4 col-md-6 col-sm-12">
                            <TotalFacilitiesByCountry/>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    )
}