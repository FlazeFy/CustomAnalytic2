import MoleculesPageHeader from '../../molecules/molecules_page_header'
import OrganismsLeftBar from '../../organisms/organisms_left_bar'
import GetAircraftModule from "./usecases/getAllAircraftModule"

export default function Aircraft() {
    return (
        <div style={{background:"#181818"}} >
            <MoleculesPageHeader main_menu="Aircraft"/>
            <main className="main">                
                <div className="content">
                    <div className="row">
                        <div className="col-3">
                            <OrganismsLeftBar active={"aircraft"}/>
                        </div>
                        <div className="col-9">
                            <div className="mb-3">
                                <GetAircraftModule ctx="aircraft"/>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    )
}