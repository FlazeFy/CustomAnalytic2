import GetVehiclesModule from './usecases/getVehiclesModule'
import OrganismsLeftBar from '../../organisms/organisms_left_bar'
import MoleculesPageHeader from '../../molecules/molecules_page_header'

export default function Vehicles() {
    return (
        <div style={{background:"#181818"}} >
            <MoleculesPageHeader main_menu="Vehicles"/>
            <main className="main">
                <div className="content">
                    <div className="row">
                        <div className="col-3">
                            <OrganismsLeftBar active={"vehicles"}/>
                        </div>
                        <div className="col-9">
                            <div className="mb-3">
                                <GetVehiclesModule ctx="vehicles_module"/>
                            </div>
                            {/* <div className="mb-3">
                                <GetAllVehicle ctx="all_vehicle"/>
                            </div>
                            <div className="mb-3">
                                <GetTotalVehicleByRole ctx="total_vehicle_by_role"/>
                            </div>
                            <div className="mb-3">
                                <GetTotalVehicleByCountry ctx="total_vehicle_by_country"/>
                            </div>
                            <div className="mb-3">
                                <GetTotalVehicleBySide ctx="total_vehicle_by_side"/>
                            </div>
                            <div className="mb-3">
                                <VehiclesSummary/>
                            </div> */}
                        </div>
                    </div>
                </div>
            </main>
        </div>
    )
}