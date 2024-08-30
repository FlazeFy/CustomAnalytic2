import MoleculesPageHeader from '../../molecules/molecules_page_header'
import OrganismsLeftBar from '../../organisms/organisms_left_bar'

export default function My() {
  return (
    <div style={{background:"#181818"}}>
      <MoleculesPageHeader main_menu="My Content"/>
      <main className="main">
        <div className="content">
          <div className="row">
            <div className="col-3">
              <OrganismsLeftBar active={"my"}/>
            </div>
            <div className="col-9">

            </div>
          </div>
        </div>
      </main>
    </div>
  )
}