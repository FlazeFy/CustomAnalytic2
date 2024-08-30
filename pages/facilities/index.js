import FacilitiesSummary from "../../components/summary/facilities"
import GetTotalFacilityByCountry from "./usecases/getTotalFacilityByCountry"
import GetTotalFacilityByType from "./usecases/getTotalFacilityByType"
import GetTotalFacilityBySide from "./usecases/getTotalFacilityBySide"
import GetFacilityLocation from "./usecases/getFacilityLocation"
import OrganismsLeftBar from '../../organisms/organisms_left_bar'
import MoleculesPageHeader from '../../molecules/molecules_page_header'

export default function Facilities() {
    return (
        <div style={{background:"#181818"}} >
            <MoleculesPageHeader main_menu="Facilities"/>
            <main className="main">
                <div className="content">
                    <div className="row">
                        <div className="col-3">
                            <OrganismsLeftBar active={"facilities"}/>
                        </div>
                        <div className="col-9">
                            <div className="mb-3">
                                <GetFacilityLocation ctx="facility_location"/>
                            </div>
                            <div className="mb-3">
                                <GetTotalFacilityByType ctx="total_facility_by_type"/>
                            </div>
                            <div className="mb-3">
                                <GetTotalFacilityByCountry ctx="total_facility_by_country"/>
                            </div>
                            <div className="mb-3">
                                <GetTotalFacilityBySide ctx="total_facility_by_side"/>
                            </div>
                            <div className="mb-3">
                                <FacilitiesSummary/>
                            </div>  
                        </div>
                    </div>
                </div>
            </main>
        </div>
    )
}