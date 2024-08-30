import GetWeaponModule from './usecases/getWeaponModule'
import OrganismsLeftBar from '../../organisms/organisms_left_bar'
import MoleculesPageHeader from '../../molecules/molecules_page_header'

export default function Weapons() {
    return (
        <div style={{background:"#181818"}} >
            <MoleculesPageHeader main_menu="Weapons"/>
            <main className="main">
                <div className="content">
                    <div className="row">
                        <div className="col-3">
                            <OrganismsLeftBar active={"weapons"}/>
                        </div>
                        <div className="col-9">
                            <div className="mb-3">
                                <GetWeaponModule ctx={"weapons_module"}/>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    )
}