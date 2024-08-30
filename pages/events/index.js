import MoleculesPageHeader from '../../molecules/molecules_page_header'
import OrganismsLeftBar from '../../organisms/organisms_left_bar'
import GetAllEvent from "./usecases/getAllEvent"

export default function Events() {
    return (
        <div style={{background:"#181818"}} >
            <MoleculesPageHeader main_menu="Events"/>
            <main className="main">
                <div className="row">
                    <div className="col-3">
                        <OrganismsLeftBar active={"events"}/>
                    </div>
                    <div className="col-9">
                        <GetAllEvent ctx="all_event"/>
                    </div>
                </div>
            </main>
        </div>
    )
}