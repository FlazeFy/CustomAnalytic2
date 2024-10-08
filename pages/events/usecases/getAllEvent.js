import React from 'react'
import { useState, useEffect } from "react"

// Component
import MoleculesTable from '../../../molecules/molecules_table'
import { getCleanTitleFromCtx } from '../../../modules/helpers/converter'

// Modules
import { getLocal, storeLocal } from '../../../modules/storages/local'
import MoleculesAlertBox from '../../../molecules/molecules_alert_box'

export default function GetAllEvent({ctx}) {
    //Initial variable
    const [error, setError] = useState(null)
    const [isLoaded, setIsLoaded] = useState(false)
    const [maxPage, setMaxPage] = useState(0)
    const [currPage, setCurrPage] = useState(0)
    const [items, setItems] = useState([])

    useEffect(() => {
        //Default config
        const keyPage = sessionStorage.getItem("Table_Events")
        const keyOrder = sessionStorage.getItem("Table_order_Events")
        const keyLimit = sessionStorage.getItem("Table_limit_Events")
        
        if(keyPage == null){
            sessionStorage.setItem("Table_Events", "1");
        }
        if(keyOrder == null){
            sessionStorage.setItem("Table_order_Events", "asc");
        }
        if(keyLimit == null){
            sessionStorage.setItem("Table_limit_Events", 15);
        }

        fetch(`http://127.0.0.1:8000/api/events/limit/${keyLimit}/order/${keyOrder}?page=${keyPage}`)
        .then(res => res.json())
            .then(
            (result) => {
                setIsLoaded(true)
                setMaxPage(result.data.last_page)
                setCurrPage(result.data.current_page)
                setItems(result.data.data)        
            },
            (error) => {
                if(getLocal(ctx + "_sess") !== undefined){
                    setIsLoaded(true)
                    setMaxPage(result.data.last_page)
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
            column_name: "Event",
            object_name: "event",
            extra_desc: null
        },
        {
            column_name: "Date Start",
            object_name: "date_start",
            extra_desc: null
        },
        {
            column_name: "Date End",
            object_name: "date_end",
            extra_desc: null
        },
        {
            column_name: "Period",
            object_name: "period",
            extra_desc: {
                desc: "days",
                pos: "end"
            }
        },
        {
            column_name: "Manage",
            object_name: null,
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
                <h2>{getCleanTitleFromCtx(ctx)}</h2>
                <MoleculesTable builder={builder} items={items} maxPage={maxPage} currentPage={currPage} ctx={"Events"}/>  
            </>
        )
    }
}
  