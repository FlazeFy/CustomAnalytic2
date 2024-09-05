import React from 'react'
import { useState, useEffect } from "react"

// Component
import MoleculesChartBar from '../../../molecules/molecules_chart_bar'
import { getCleanTitleFromCtx } from '../../../modules/helpers/converter'

// Modules
import { getLocal, storeLocal } from '../../../modules/storages/local'
import MoleculesAlertBox from '../../../molecules/molecules_alert_box'

export default function GetTotalWeaponByCountry({ctx}) {
    //Initial variable
    const [error, setError] = useState(null)
    const [isLoaded, setIsLoaded] = useState(false)
    const [items, setItems] = useState([])
    const filter_name = "Weapon_Country"

    useEffect(() => {
        //Default config
        const keyLimit = sessionStorage.getItem(`Bar_limit_${filter_name}`)
        if(keyLimit == null){
            sessionStorage.setItem(`Bar_limit_${filter_name}`, 10);
        }

        fetch(`https://ww2-test.leonardhors.com/api/weapons/total/bycountry/${keyLimit}`)
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
                <MoleculesChartBar items={items} filter_name={filter_name}/>  
            </>
        )
    }
}
  