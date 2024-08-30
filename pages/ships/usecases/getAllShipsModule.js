import React from 'react'
import { useState, useEffect } from "react"
import Swal from 'sweetalert2'
import AtomsText from '../../../atoms/atoms_text'

// Component
import MoleculesTable from '../../../molecules/molecules_table'
import { getCleanTitleFromCtx } from '../../../modules/helpers/converter'

// Modules
import { getLocal, storeLocal } from '../../../modules/storages/local'
import MoleculesAlertBox from '../../../molecules/molecules_alert_box'
import MoleculesChartBar from '../../../molecules/molecules_chart_bar'
import MoleculesChartPie from '../../../molecules/molecules_chart_pie'

export default function GetShipsModule({ctx}) {
    //Initial variable
    const [error, setError] = useState(null)
    const [dataStatus, setDataStatus] = useState(null)
    const [isLoaded, setIsLoaded] = useState(false)
    const [userToken, setUserToken] = useState(null)

    const [maxPage, setMaxPage] = useState(0)
    const [currPage, setCurrPage] = useState(0)
    const [items, setItems] = useState([])
    const [itemsStatsCountry, setItemsStatsCountry] = useState([])
    const [itemsStatsClass, setItemsStatsClass] = useState([])
    const [itemsStatsSide, setItemsStatsSide] = useState([])

    useEffect(() => {
        Swal.showLoading()
        setUserToken(getLocal('token_key'))

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

        const params = new URLSearchParams({
            limit_data_all: keyLimit,
            order_data_all: keyOrder,
            search_data_all: keySearch,
            limit_stats_by_class: 7,
            limit_stats_by_country: 7
        })
        
        fetch(`http://127.0.0.1:8000/api/ships?${params}`)
        .then(res => res.json())
            .then(
            (result) => {
                Swal.close()
                setIsLoaded(true)
                setDataStatus(null)

                setMaxPage(result.data_all.last_page)
                setCurrPage(result.data_all.current_page)
                setItems(result.data_all.data)  

                setItemsStatsCountry(result.stats.total_by_country)
                setItemsStatsClass(result.stats.total_by_class)
                setItemsStatsSide(result.stats.total_by_sides)

                storeLocal('ships_module',JSON.stringify(result))
            },
            (error) => {
                Swal.close()
                if(getLocal('ships_module')){
                    setError(null)
                    setIsLoaded(true)
                    setDataStatus(<>This is a <b>local data</b> of <b>{getCleanTitleFromCtx(ctx)}</b>. We will fetch a new data when we success contact to server</>)
                    Swal.fire({
                        icon: "warning",
                        title: "Oops...",
                        text: "Something went wrong! But we still have recovered data to show you",
                    })

                    const res_backup = JSON.parse(getLocal('ships_module'))
                    setMaxPage(res_backup.data_all.last_page)
                    setCurrPage(res_backup.data_all.current_page)
                    setItems(res_backup.data_all.data)  

                    setItemsStatsCountry(res_backup.stats.total_by_country)
                    setItemsStatsClass(res_backup.stats.total_by_class)
                    setItemsStatsSide(res_backup.stats.total_by_sides)
                } else {
                    Swal.fire({
                        icon: "error",
                        title: "Oops...",
                        text: "Something went wrong!",
                    })
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
                {
                    dataStatus && <MoleculesAlertBox message={dataStatus} type='warning' context={ctx}/>
                }
                <div className='mb-3'>
                    <AtomsText body="All Ships" text_type="sub_heading"/>
                    <MoleculesTable builder={
                            userToken ?
                            [...builder,{
                                column_name: "Manage",
                                object_name: null,
                                extra_desc: null
                            }] : builder
                        } items={items} maxPage={maxPage} currentPage={currPage} ctx={"Ships"}/>  
                </div>
                <div className='mb-3'>
                    <AtomsText body="Total Ships By Country" text_type="sub_heading"/>
                    <MoleculesChartBar items={itemsStatsCountry} filter_name="Ships_Country"/>  
                </div>
                <div className='mb-3'>
                    <AtomsText body="Total Ships By Sides" text_type="sub_heading"/>
                    <MoleculesChartPie items={itemsStatsSide} filter_name="Ships_Sides"/>  
                </div>
                <div className='mb-3'>
                    <AtomsText body="Total Ships By Class" text_type="sub_heading"/>
                    <MoleculesChartPie items={itemsStatsClass} filter_name="Ships_Class"/>  
                </div>
            </>
        )
    }
}
  