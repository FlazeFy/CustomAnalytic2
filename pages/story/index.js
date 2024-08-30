import MoleculesPageHeader from '../../molecules/molecules_page_header'
import OrganismsLeftBar from '../../organisms/organisms_left_bar'
import GetAllStories from './usecases/getAllStories'

export default function Story() {
  return (
    <div style={{background:"#181818"}}>
      <MoleculesPageHeader main_menu="Story"/>
      <main className="main">
        <div className="content">
          <div className="row">
            <div className="col-3">
              <OrganismsLeftBar active={"story"}/>
            </div>
            <div className="col-9">
              <div className="row">
                <GetAllStories ctx={"All_Stories"}/>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}