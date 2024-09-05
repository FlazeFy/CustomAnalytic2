import React from 'react'
import { useState, useEffect } from "react"
import MoleculesChartColumn from '../../../molecules/molecules_chart_column'

// Component
import { getCleanTitleFromCtx } from '../../../modules/helpers/converter'

// Modules
import { getLocal, storeLocal } from '../../../modules/storages/local'
import MoleculesAlertBox from '../../../molecules/molecules_alert_box'

export default function GetTotalDeathByCountry({ctx}) {
    //Initial variable
    const [error, setError] = useState(null)
    const [isLoaded, setIsLoaded] = useState(false)
    const [maxPage, setMaxPage] = useState(0)
    const [currPage, setCurrPage] = useState(0)
    const [items, setItems] = useState([])

    useEffect(() => {
        //Default config
        const keyPage = sessionStorage.getItem("Table_Deaths")
        const keyOrder = sessionStorage.getItem("Table_order_Deaths")
        const keyLimit = sessionStorage.getItem("Table_limit_Deaths")
        
        if(keyPage == null){
            sessionStorage.setItem("Table_Deaths", "1");
        }
        if(keyOrder == null){
            sessionStorage.setItem("Table_order_Deaths", "asc");
        }
        if(keyLimit == null){
            sessionStorage.setItem("Table_limit_Deaths", 7);
        }

        fetch(`https://ww2-test.leonardhors.com/api/casualities/totaldeath/bycountry/${keyOrder}/molecules_filter_limit/${keyLimit}?page=${keyPage}`)
        .then(res => res.json())
            .then(
            (result) => {
                setIsLoaded(true)
                setMaxPage(result.data.last_page)
                setCurrPage(result.data.current_page)
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
            object_name: "total",
            extra_desc: null
        },
        {
            column_name: "Military Death",
            object_name: "military_death",
            extra_desc: null
        },
        {
            column_name: "Civilian Death",
            object_name: "civilian_death",
            extra_desc: null
        },
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
                <MoleculesChartColumn items={items} builder={builder} ctx={"Deaths"} maxPage={maxPage} currentPage={currPage}/>
            </>
        )
    }
}
  