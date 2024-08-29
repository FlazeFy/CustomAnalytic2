import Head from 'next/head'

import TotalShipsByLaunchYear from "../../components/radarChart/totalShipsByLaunchYear"
import ShipsSummary from "../../components/summary/ships"
import GetTotalShipByCountry from "./usecases/getTotalShipByCountry"
import GetTotalShipBySide from "./usecases/getTotalShipBySide"
import GetAllShip from "./usecases/getAllShip"
import GetShipsModule from './usecases/getAllShipsModule'
import OrganismsLeftBar from '../../organisms/organisms_left_bar'

export default function Ships() {
    return (
        <div style={{background:"#181818"}} >
            <Head>
                <title>WorldWarII | Ships</title>
                <meta name="description" content="Generated by create next app" />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <main className="main">
                <div className="content">
                    <div className="row">
                        <div className="col-3">
                            <OrganismsLeftBar active={"ships"}/>
                        </div>
                        <div className="col-9">
                            <div className="mb-3">
                                <GetShipsModule ctx="ships_module"/>
                            </div>
                            {/* <div className="mb-3">
                                <GetAllShip ctx="all_ship"/>
                            </div>
                            <div className="mb-3">
                                <GetTotalShipByCountry ctx="total_ship_by_country"/>
                            </div>
                            <div className="mb-3">
                                <GetTotalShipBySide ctx="total_ship_by_side"/>
                            </div>
                            <div className="mb-3">
                                <TotalShipsByLaunchYear/> 
                            </div>
                            <div className="mb-3">
                                <ShipsSummary/>
                            </div> */}
                        </div>
                    </div>
                </div>
            </main>
        </div>
    )
}