import GetShipsModule from './usecases/getAllShipsModule'
import OrganismsLeftBar from '../../organisms/organisms_left_bar'
import MoleculesPageHeader from '../../molecules/molecules_page_header'

export default function Ships() {
    return (
        <div style={{background:"#181818"}} >
            <MoleculesPageHeader main_menu="Ships"/>
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
                        </div>
                    </div>
                </div>
            </main>
        </div>
    )
}