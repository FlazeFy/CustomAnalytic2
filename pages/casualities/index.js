import Head from 'next/head'
import Navbar from "../../components/navbar/left_bar"

import CasualitiesSummary from "../../components/summary/casualities"
import GetTotalDeathBySide from "./usecases/getTotalDeathBySide"
import GetTotalDeathByCountry from "./usecases/getTotalDeathByCountry"

export default function Casualities() {
    return (
        <div style={{background:"#181818"}} >
            <Head>
                <title>WorldWarII | Casualities</title>
                <meta name="description" content="Generated by create next app" />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <main className="main">
                <div className="content">
                    <div className="row">
                        <div className="col-3">
                            <Navbar active={"casualities"}/>
                        </div>
                        <div className="col-9">
                            <div className="mb-3">
                                <GetTotalDeathByCountry ctx="total_death_by_country"/>
                            </div>
                            <div className="row mb-3">
                                <div className="col-lg-6 col-md-6 col-sm-12">
                                    <GetTotalDeathBySide ctx="total_death_by_side_military" view="Military"/>
                                </div>
                                <div className="col-lg-6 col-md-6 col-sm-12">  
                                    <GetTotalDeathBySide ctx="total_death_by_side_civilian" view="Civilian"/>
                                </div>
                            </div>
                            <CasualitiesSummary/>    
                        </div>
                    </div>
                </div>
            </main>
        </div>
    )
}