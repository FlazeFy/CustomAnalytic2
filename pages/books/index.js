import { useState, useEffect } from "react"
import Head from 'next/head'
import Navbar from "../../components/navbar/left_bar"

import TotalBooksByYearReview from "../../components/radarChart/totalBooksByYearReview"
import BooksSummary from "../../components/summary/books"
import GetTotalBookByReviewer from "./usecases/getTotalBookByReviewer"
import GetAllBook from "./usecases/getAllBook"

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
                            <Navbar active={"books"}/>
                        </div>
                        <div className="col-9">
                            <div className="mb-3">
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
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    )
}