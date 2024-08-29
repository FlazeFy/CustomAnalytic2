import Head from 'next/head'

import TotalBooksByYearReview from "../../components/radarChart/totalBooksByYearReview"
import BooksSummary from "../../components/summary/books"
import GetTotalBookByReviewer from "./usecases/getTotalBookByReviewer"
import GetAllBook from "./usecases/getAllBook"
import GetBooksModule from "./usecases/getBooksModule"
import OrganismsLeftBar from "../../organisms/organisms_left_bar"

export default function Books() {
    return (
        <div style={{background:"#181818"}} >
            <Head>
                <title>WorldWarII | Books</title>
                <meta name="description" content="Generated by create next app" />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
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