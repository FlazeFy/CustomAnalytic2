import { faCheck, faEllipsisVertical } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'
import { useState, useEffect } from "react"
import AtomsText from '../../../atoms/atoms_text'

// Component
import { getCleanTitleFromCtx } from '../../../modules/helpers/converter'

// Modules
import { getLocal, storeLocal } from '../../../modules/storages/local'
import MoleculesAlertBox from '../../../molecules/molecules_alert_box'
import MoleculesWorldMap from '../../../molecules/molecules_world_map'

export default function GetFacilityLocation({ctx}) {
    //Initial variable
    const [error, setError] = useState(null)
    const [isLoaded, setIsLoaded] = useState(false)
    const [items, setItems] = useState([])
    const [items2, setItems2] = useState([])

    //Chart filter and config
    const setCategory = (type) => {
        sessionStorage.setItem(`chart_filter_${ctx}_sess`, type);
        location.reload();
    }

    const getListCatAll = (slct) => {
        if(slct != "NULL"){
            return (
                <li key={0}><a className="dropdown-item" onClick={(e)=> setCategory("NULL")}>All</a></li>
            );
            } else {
            return (
                <li key={0}><a className="dropdown-item" onClick={(e)=> setCategory("NULL")}><FontAwesomeIcon icon={faCheck}/> All</a></li>
            );
        }
    }

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
                <AtomsText text_type="sub_heading" body={getCleanTitleFromCtx(ctx)}/>
                <AtomsText text_type="main_content" body={<>Show {items.length} facilities</>}/>
                <div className="dropdown">
                <button className="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false">
                    <FontAwesomeIcon icon={faEllipsisVertical}/></button>
                    <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton1">
                    {getListCatAll(sessionStorage.getItem(`chart_filter_${ctx}_sess`))}
                    {
                        //Category type filter
                        items2.map((val, i, index) => {
                        if(val.type == sessionStorage.getItem(`chart_filter_${ctx}_sess`)){
                            return (
                                <li key={i}><button className="dropdown-item" onClick={(e)=> setCategory(val.type)}><FontAwesomeIcon icon={faCheck}/> {val.type}</button></li>
                            );
                        } else {
                            return (
                                <li key={i}><button className="dropdown-item" onClick={(e)=> setCategory(val.type)}>{val.type}</button></li>
                            );
                        }
                        })
                    }
                    </ul>
                </div>
                <MoleculesWorldMap items={items}/>
            </>
        )
    }
}
  