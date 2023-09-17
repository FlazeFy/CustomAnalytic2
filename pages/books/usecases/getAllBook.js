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

        if(keyPage == null){
            sessionStorage.setItem("Table_Books", "1");
        }
        if(keyOrder == null){
            sessionStorage.setItem("Table_order_Books", "asc");
        }
        if(keyLimit == null){
            sessionStorage.setItem("Table_limit_Books", 15);
        }

        fetch(`http://127.0.0.1:8000/api/books/limit/${keyLimit}/order/${keyOrder}?page=${keyPage}`)
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
            object_name: "title"
        },
        {
            column_name: "Author",
            object_name: "author"
        },
        {
            column_name: "Reviewer",
            object_name: "reviewer"
        },
        {
            column_name: "Review Date",
            object_name: "review_date"
        },
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
  