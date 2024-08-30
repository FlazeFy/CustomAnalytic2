import GetAllContributor from "./usecases/getAllContributor"
import OrganismsLeftBar from "../../organisms/organisms_left_bar"
import MoleculesPageHeader from "../../molecules/molecules_page_header"

export default function AboutUs() {
    return (
        <div style={{background:"#181818"}} >
            <MoleculesPageHeader main_menu="About Us"/>
            <main className="main">                
                <div className="content">
                    <div className="row">
                        <div className="col-3">
                            <OrganismsLeftBar active={"about"}/>
                        </div>
                        <div className="col-9">
                            <GetAllContributor/>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    )
}