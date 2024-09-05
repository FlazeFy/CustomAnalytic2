import React from 'react'
import { useState, useEffect } from "react"

// Component
import { getCleanTitleFromCtx } from '../../../modules/helpers/converter'

// Modules
import { getLocal, storeLocal } from '../../../modules/storages/local'
import MoleculesAlertBox from '../../../molecules/molecules_alert_box'
import MoleculesTable from '../../../molecules/molecules_table'

export default function GetAllShip({ctx}) {
    //Initial variable
    const [error, setError] = useState(null)
    const [isLoaded, setIsLoaded] = useState(false)
    const [maxPage, setMaxPage] = useState(0)
    const [currPage, setCurrPage] = useState(0)
    const [items, setItems] = useState([])

    useEffect(() => {
        //Default config
        const keyPage = sessionStorage.getItem("Table_Ships")
        const keyOrder = sessionStorage.getItem("Table_order_Ships")
        const keyLimit = sessionStorage.getItem("Table_limit_Ships")
        const keySearch = sessionStorage.getItem("Table_search_Ships")
        
        if(keyPage == null){
            sessionStorage.setItem("Table_Ships", "1");
        }
        if(keyOrder == null){
            sessionStorage.setItem("Table_order_Ships", "asc");
        }
        if(keyLimit == null){
            sessionStorage.setItem("Table_limit_Ships", 15);
        }
        if(keySearch == null || keySearch.trim() == ""){
            sessionStorage.setItem("Table_search_Ships", "%20");
        }

        fetch(`https://ww2-test.leonardhors.com/api/ships/limit/${keyLimit}/order/${keyOrder}/find/${keySearch}?page=${keyPage}`)
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
            column_name: "Name",
            object_name: "name",
            extra_desc: null
        },
        {
            column_name: "Class",
            object_name: "class",
            extra_desc: null
        },
        {
            column_name: "Country",
            object_name: "country",
            extra_desc: null
        },
        {
            column_name: "Launch Year",
            object_name: "launch_year",
            extra_desc: null
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
                <MoleculesTable builder={builder} items={items} maxPage={maxPage} currentPage={currPage} ctx={"Ships"}/>  
            </>
        )
    }
}
  