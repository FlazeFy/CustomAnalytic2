import GetBooksModule from "./usecases/getBooksModule"
import OrganismsLeftBar from "../../organisms/organisms_left_bar"
import MoleculesPageHeader from "../../molecules/molecules_page_header"

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
                            {/* <div className="mb-3">
                                <GetAllBook ctx="all_book"/>
                            </div>
                            <div className="mb-3">
                                <GetTotalBookByReviewer ctx="total_book_by_reviewer"/>
                            </div>
                            <div className="mb-3">
                                <TotalBooksByYearReview/>
                            </div>
                            <div className="mb-3">
                                <BooksSummary/>
                            </div> */}
                        </div>
                    </div>
                </div>
            </main>
        </div>
    )
}