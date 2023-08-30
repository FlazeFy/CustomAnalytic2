import React from 'react'
import { useState, useEffect } from "react"
import GetColumnChart from '../../../components/charts/column_chart'

// Component
import { getCleanTitleFromCtx } from '../../../modules/helpers/converter'

// Modules
import { getLocal, storeLocal } from '../../../modules/storages/local'

export default function GetTotalDeathByCountry({ctx}) {
    //Initial variable
    const [error, setError] = useState(null)
    const [isLoaded, setIsLoaded] = useState(false)
    const [maxPage, setMaxPage] = useState([])
    const [items, setItems] = useState([])

    useEffect(() => {
        fetch("http://127.0.0.1:8000/api/casualities/totaldeath/bycountry/DESC/limit/10?page="+sessionStorage.getItem(`Column_Chart_${ctx}`))
        .then(res => res.json())
            .then(
            (result) => {
                setIsLoaded(true)
                setMaxPage(result.data.last_page)
                setItems(result.data.data)
                const item = result.data.data
                storeLocal(ctx + "_sess",JSON.stringify(item))             
            },
            (error) => {
                if(getLocal(ctx + "_sess") !== undefined){
                    setIsLoaded(true)
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
            column_name: "Total Death",
            object_name: "total"
        },
        {
            column_name: "Military Death",
            object_name: "military_death"
        },
        {
            column_name: "Civilian Death",
            object_name: "civilian_death"
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
                <GetColumnChart items={items} builder={builder} ctx={ctx} maxPage={maxPage}/>
            </>
        )
    }
}
  