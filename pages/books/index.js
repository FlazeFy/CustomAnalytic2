import GetBooksModule from "./usecases/getBooksModule"
import OrganismsLeftBar from "../../organisms/organisms_left_bar"
import MoleculesPageHeader from "../../molecules/molecules_page_header"
import GetBooksSummary from "./usecases/getBooksSummary"

export default function Books() {
    return (
        <div style={{background:"#181818"}} >
            <MoleculesPageHeader main_menu="Books"/>
            <main className="main">                
                <div className="content">
                    <div className="row">
                        <div className="col-3">
                            <OrganismsLeftBar active={"books"}/>
                        </div>
                        <div className="col-9">
                            <div className="mb-3">
                                <GetBooksModule ctx="books_module"/>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    )
}