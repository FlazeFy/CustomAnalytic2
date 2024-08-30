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
                            {/* <div className="mb-3">
                                <GetAllWeapon ctx="all_weapon"/>
                            </div>
                            <div className="mb-3">
                                <GetTotalWeaponByType ctx="total_weapon_by_type"/>
                            </div>
                            <div className="mb-3">
                                <GetTotalWeaponByCountry ctx="total_weapon_by_country"/>
                            </div>
                            <div className="mb-3">
                                <GetTotalWeaponBySide ctx="total_weapon_by_side"/>
                            </div>
                            <div className="mb-3">
                                <WeaponsSummary/>
                            </div> */}
                        </div>
                    </div>
                </div>
            </main>
        </div>
    )
}