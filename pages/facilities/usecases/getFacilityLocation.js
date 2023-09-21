import React from 'react'
import { useState, useEffect } from "react"

// Component
import GetMap from '../../../components/maps/map'
import { getCleanTitleFromCtx } from '../../../modules/helpers/converter'

// Modules
import { getLocal, storeLocal } from '../../../modules/storages/local'

export default function GetFacilityLocation({ctx}) {
    //Initial variable
    const [error, setError] = useState(null)
    const [isLoaded, setIsLoaded] = useState(false)
    const [items, setItems] = useState([])
    const [items2, setItems2] = useState([])

    useEffect(() => {
        //Default config
        const keyword = sessionStorage.getItem(`chart_filter_${ctx}_sess`)
        if(keyword == null){
            sessionStorage.setItem(`chart_filter_${ctx}_sess`, 'NULL');
        }

        fetch(`http://127.0.0.1:8000/api/facilities/bylocation/${keyword}`)
        .then(res => res.json())
            .then(
            (result) => {
                setIsLoaded(true)
                setItems(result.data)
                const item = result.data
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

    useEffect(() => {
        fetch("http://127.0.0.1:8000/api/facilities/type")
        .then(res => res.json())
            .then(
            (result) => {
                setIsLoaded(true);
                setItems2(result.data);
            },
            (error) => {
                setIsLoaded(true);
                setError(error);
            }
        )
    },[])

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
                <GetMap items={items} category_filter={items2} filter_name={ctx}/>  
            </>
        )
    }
}
  