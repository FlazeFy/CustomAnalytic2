import MoleculesPageHeader from '../../molecules/molecules_page_header'
import OrganismsLeftBar from '../../organisms/organisms_left_bar'

// Usecases
import GetProfileInfo from './usecases/getProfileInfo'

export default function Profile() {
    return (
        <div style={{background:"#181818"}}>
            <MoleculesPageHeader main_menu="Profile"/>
            <main className="main">
                <div className="content">
                <div className="row">
                    <div className="col-3">
                    <OrganismsLeftBar active={"my"}/>
                    </div>
                    <div className="col-9">
                        <GetProfileInfo ctx="My Profile"/>
                    </div>
                </div>
                </div>
            </main>
        </div>
    )
}