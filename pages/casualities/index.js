import CasualitiesSummary from "../../components/summary/casualities"
import GetTotalDeathBySide from "./usecases/getTotalDeathBySide"
import GetTotalDeathByCountry from "./usecases/getTotalDeathByCountry"
import OrganismsLeftBar from '../../organisms/organisms_left_bar'
import MoleculesPageHeader from "../../molecules/molecules_page_header"

export default function Casualities() {
    return (
        <div style={{background:"#181818"}} >
            <MoleculesPageHeader main_menu="Casualities"/>
            <main className="main">
                <div className="content">
                    <div className="row">
                        <div className="col-3">
                            <OrganismsLeftBar active={"casualities"}/>
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