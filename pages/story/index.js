import AtomsBreakLine from '../../atoms/atoms_breakline'
import AtomsText from '../../atoms/atoms_text'
import MoleculesPageHeader from '../../molecules/molecules_page_header'
import OrganismsLeftBar from '../../organisms/organisms_left_bar'
import GetAllStories from './usecases/getAllStories'
import GetTopCreator from './usecases/getTopCreator'

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
                <AtomsText text_type="main_heading" body="All Stories"/>
                <GetAllStories ctx={"All_Stories"}/>
                <hr className='section-line'></hr>
                <AtomsText text_type="main_heading" body="Top Creator"/>
                <GetTopCreator ctx={"Top_Creator"}/>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}