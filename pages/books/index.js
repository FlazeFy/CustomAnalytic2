import { useState, useEffect } from "react"
import Head from 'next/head'
import styles from '../../styles/Home.module.css'
import Navbar from "../../components/navbar/new_navbar"

import AllBooks from "../../components/table/allBooks"
import TotalBooksByReviewer from "../../components/barChart/totalBooksByReviewer"
import TotalBooksByYearReview from "../../components/radarChart/totalBooksByYearReview"
import BooksSummary from "../../components/summary/books"
import MostAuthorPublished from "../../components/pieChart/mostAuthorPublished"

export default function Books() {
    return (
        <div style={{background:"#181818"}} >
            <Head>
                <title>WorldWarII | Books</title>
                <meta name="description" content="Generated by create next app" />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <main className={styles.main}>                
                <div className="content">
                    <div className="row">
                        <div className="col-3">
                            <Navbar active={"books"}/>
                        </div>
                        <div className="col-9">
                            <div className="mb-3">
                                <AllBooks/>
                            </div>
                            <div className="row mb-3">
                                <div className="col-lg-6 col-md-6 col-sm-12">
                                    <div className="mb-3">
                                        <TotalBooksByReviewer/>
                                    </div>
                                    <MostAuthorPublished/>
                                </div>
                                <div className="col-lg-6 col-md-6 col-sm-12">
                                    <div className="mb-3">
                                        <TotalBooksByYearReview/>
                                    </div>
                                    <BooksSummary/>
                                </div>
                            </div>    
                        </div>
                    </div>
                </div>
            </main>
        </div>
    )
}