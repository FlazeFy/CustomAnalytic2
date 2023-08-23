import React from 'react'
import { useState, useEffect } from "react"

// Component
import GetGeneralTable from '../../../components/table/general_table'
import { getCleanTitleFromCtx } from '../../../modules/helpers/converter'

// Modules
import { getLocal, storeLocal } from '../../../modules/storages/local'

export default function GetAllVehicle({ctx}) {
    //Initial variable
    const [error, setError] = useState(null)
    const [isLoaded, setIsLoaded] = useState(false)
    const [maxPage, setMaxPage] = useState([])
    const [items, setItems] = useState([])

    useEffect(() => {
        //Default config
        if(sessionStorage.getItem("Table_Vehicle") == null){
            sessionStorage.setItem("Table_Vehicle", "1");
        }

        fetch("http://127.0.0.1:8000/api/vehicles/limit/15/order/ASC?page="+sessionStorage.getItem("Table_Ships"))
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
            object_name: "name"
        },
        {
            column_name: "Primary Role",
            object_name: "primary_role"
        },
        {
            column_name: "Manufacturer",
            object_name: "manufacturer"
        },
        {
            column_name: "Country",
            object_name: "country"
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
                <GetGeneralTable builder={builder} items={items} ctx={ctx}/>  
            </>
        )
    }
}
  