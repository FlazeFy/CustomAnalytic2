import { faWarning } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'
import { useState, useEffect } from "react"
import Swal from 'sweetalert2'
import AtomsText from '../../../atoms/atoms_text'
import GetBarChart from '../../../components/charts/bar_chart'

// Component
import GetGeneralTable from '../../../components/table/general_table'
import { getCleanTitleFromCtx } from '../../../modules/helpers/converter'

// Modules
import { getLocal, storeLocal } from '../../../modules/storages/local'
import MoleculesAlertBox from '../../../molecules/molecules_alert_box'

export default function GetBooksModule({ctx}) {
    //Initial variable
    const [error, setError] = useState(null)
    const [dataStatus, setDataStatus] = useState(null)
    const [isLoaded, setIsLoaded] = useState(false)
    const [userToken, setUserToken] = useState(null)

    const [maxPage, setMaxPage] = useState(0)
    const [currPage, setCurrPage] = useState(0)
    const [items, setItems] = useState([])
    const [itemsStatsReviewer, setItemsStatsReviewer] = useState([])

    useEffect(() => {
        Swal.showLoading()
        setUserToken(getLocal('token_key'))

        //Default config
        const keyPage = sessionStorage.getItem("Table_Books")
        const keyOrder = sessionStorage.getItem("Table_order_Books")
        const keyLimit = sessionStorage.getItem("Table_limit_Books")
        const keySearch = sessionStorage.getItem("Table_search_Books")

        if(keyPage == null){
            sessionStorage.setItem("Table_Books", "1");
        }
        if(keyOrder == null){
            sessionStorage.setItem("Table_order_Books", "asc");
        }
        if(keyLimit == null){
            sessionStorage.setItem("Table_limit_Books", 15);
        }
        if(keySearch == null || keySearch.trim() == ""){
            sessionStorage.setItem("Table_search_Books", "%20");
        }

        const params = new URLSearchParams({
            limit_data_all: keyLimit,
            order_data_all: keyOrder,
            search_data_all: keySearch,
            limit_stats_by_reviewer: 7,
        })
        
        fetch(`http://127.0.0.1:8000/api/books?${params}`)
        .then(res => res.json())
            .then(
            (result) => {
                Swal.close()
                setIsLoaded(true)
                setDataStatus(null)

                setMaxPage(result.data_all.last_page)
                setCurrPage(result.data_all.current_page)
                setItems(result.data_all.data)  

                setItemsStatsReviewer(result.stats.total_by_reviewer)

                storeLocal('Books_module',JSON.stringify(result))
            },
            (error) => {
                Swal.close()
                if(getLocal('Books_module')){
                    setError(null)
                    setIsLoaded(true)
                    setDataStatus(<>This is a <b>local data</b> of <b>{getCleanTitleFromCtx(ctx)}</b>. We will fetch a new data when we success contact to server</>)
                    Swal.fire({
                        icon: "warning",
                        title: "Oops...",
                        text: "Something went wrong! But we still have recovered data to show you",
                    })

                    const res_backup = JSON.parse(getLocal('Books_module'))
                    setMaxPage(res_backup.data_all.last_page)
                    setCurrPage(res_backup.data_all.current_page)
                    setItems(res_backup.data_all.data)  

                    setItemsStatsReviewer(res_backup.stats.total_by_reviewer)
                } else {
                    Swal.fire({
                        icon: "error",
                        title: "Oops...",
                        text: "Something went wrong!",
                    })
                    setError(error)
                }
            }
        )
    },[])

    const builder = [
        {
            column_name: "Title",
            object_name: "title",
            extra_desc: null
        },
        {
            column_name: "Author",
            object_name: "author",
            extra_desc: null
        },
        {
            column_name: "Reviewer",
            object_name: "reviewer",
            extra_desc: null
        },
        {
            column_name: "Review Date",
            object_name: "review_date",
            extra_desc: null
        }
    ]

    if (error) {
        return <MoleculesAlertBox message={error.message} type='danger' context={ctx}/>
    } else if (!isLoaded) {
        return (
            <div>
                <h5 className='text-center text-white mt-2 fst-italic'>Loading...</h5>
            </div>
        )
    } else {
        return (
            <> 
                {
                    dataStatus && (
                        <div className='alert alert-warning' role='alert'>
                            <h4><FontAwesomeIcon icon={faWarning}/> Warning</h4>
                            {dataStatus}
                        </div>
                    )
                }
                <div className='mb-3'>
                    <AtomsText body="All Books" text_type="sub_heading"/>
                    <GetGeneralTable builder={
                            userToken ?
                            [...builder,{
                                column_name: "Manage",
                                object_name: null,
                                extra_desc: null
                            }] : builder
                        } items={items} maxPage={maxPage} currentPage={currPage} ctx={"Books"}/>  
                </div>
                <div className='mb-3'>
                    <AtomsText body="Total Books By Reviewer" text_type="sub_heading"/>
                    <GetBarChart items={itemsStatsReviewer} filter_name="Books_Reviewer"/>  
                </div>
            </>
        )
    }
}
  