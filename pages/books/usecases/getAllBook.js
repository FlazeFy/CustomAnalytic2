import React from 'react'
import { useState, useEffect } from "react"

// Component
import GetGeneralTable from '../../../components/table/general_table'
import { getCleanTitleFromCtx } from '../../../modules/helpers/converter'

// Modules
import { getLocal, storeLocal } from '../../../modules/storages/local'

export default function GetAllBook({ctx}) {
    //Initial variable
    const [error, setError] = useState(null)
    const [isLoaded, setIsLoaded] = useState(false)
    const [maxPage, setMaxPage] = useState(0)
    const [currPage, setCurrPage] = useState(0)
    const [items, setItems] = useState([])

    useEffect(() => {
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

        fetch(`http://127.0.0.1:8000/api/books/limit/${keyLimit}/order/${keyOrder}/find/${keySearch}?page=${keyPage}`)
        .then(res => res.json())
            .then(
            (result) => {
                setIsLoaded(true)
                setMaxPage(result.data.last_page)
                setItems(result.data.data)        
            },
            (error) => {
                if(getLocal(ctx + "_sess") !== undefined){
                    setIsLoaded(true)
                    setMaxPage(result.data.last_page)
                    setCurrPage(result.data.current_page)
                    setItems(JSON.parse(getLocal(ctx + "_sess")))
                } else {
                    setIsLoaded(true)
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
        },
        {
            column_name: "Manage",
            object_name: null,
            extra_desc: null
        }
    ]

    if (error) {
        return <div><h2>{getCleanTitleFromCtx(ctx)}</h2> Error: {error.message}</div>
    } else if (!isLoaded) {
        return (
            <div>
                <h5 className='text-center text-white mt-2 fst-italic'>Loading...</h5>
            </div>
        )
    } else {
        return (
            <> 
                <h2>{getCleanTitleFromCtx(ctx)}</h2>
                <GetGeneralTable builder={builder} items={items} maxPage={maxPage} currentPage={currPage} ctx={"Books"}/>  
            </>
        )
    }
}
  