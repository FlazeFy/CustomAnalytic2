import { useState, useEffect } from "react"
import Head from 'next/head'
import styles from '../../styles/Home.module.css'
import Navbar from "../../components/navbar"

//Font awesome icon
import { library } from "@fortawesome/fontawesome-svg-core"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faDownload } from "@fortawesome/free-solid-svg-icons"
import AllWeapons from "../../components/table/allWeapons"
import TotalWeaponsByType from "../../components/barChart/totalWeaponsByType"
import TotalWeaponsByCountry from "../../components/barChart/totalWeaponsByCountry"

export default function Weapons() {
    return (
        <div style={{background:"#F2F8FF"}} >
            <Head>
                <title>WorldWarII | Weapons</title>
                <meta name="description" content="Generated by create next app" />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <main className={styles.main}>
                <Navbar active={"weapons"}/>
                
                <div className="content">
                    <div className="row">
                        <div className="col-lg-4 col-md-6 col-sm-12">
                           <AllWeapons/>
                        </div>
                        <div className="col-lg-4 col-md-6 col-sm-12">
                            <TotalWeaponsByType/>
                        </div>
                        <div className="col-lg-4 col-md-6 col-sm-12">
                            <TotalWeaponsByCountry/>                  
                        </div>
                    </div>
                </div>
            </main>
        </div>
    )
}