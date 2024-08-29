import { faWarning } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'
import { useState, useEffect } from "react"
import Swal from 'sweetalert2'
import AtomsText from '../../../atoms/atoms_text'
import GetBarChart from '../../../components/charts/bar_chart'
import GetPieChart from '../../../components/charts/pie_chart'

// Component
import GetGeneralTable from '../../../components/table/general_table'
import { getCleanTitleFromCtx } from '../../../modules/helpers/converter'

// Modules
import { getLocal, storeLocal } from '../../../modules/storages/local'

export default function GetWeaponModule({ctx}) {
    //Initial variable
    const [error, setError] = useState(null)
    const [dataStatus, setDataStatus] = useState(null)
    const [isLoaded, setIsLoaded] = useState(false)

    const [maxPage, setMaxPage] = useState(0)
    const [currPage, setCurrPage] = useState(0)
    const [items, setItems] = useState([])
    const [itemsStatsCountry, setItemsStatsCountry] = useState([])
    const [itemsStatsType, setItemsStatsType] = useState([])
    const [itemsStatsSide, setItemsStatsSide] = useState([])

    useEffect(() => {
        Swal.showLoading()
        //Default config
        const keyPage = sessionStorage.getItem("Table_Weapons")
        const keyOrder = sessionStorage.getItem("Table_order_Weapons")
        const keyLimit = sessionStorage.getItem("Table_limit_Weapons")
        const keySearch = sessionStorage.getItem("Table_search_Weapons")

        if(keyPage == null){
            sessionStorage.setItem("Table_Weapons", "1");
        }
        if(keyOrder == null){
            sessionStorage.setItem("Table_order_Weapons", "asc");
        }
        if(keyLimit == null){
            sessionStorage.setItem("Table_limit_Weapons", 15);
        }
        if(keySearch == null || keySearch.trim() == ""){
            sessionStorage.setItem("Table_search_Weapons", "%20");
        }

        const params = new URLSearchParams({
            limit_data_all: keyLimit,
            order_data_all: keyOrder,
            search_data_all: keySearch,
            limit_stats_by_type: 7,
            limit_stats_by_country: 7
        })
        
        fetch(`http://127.0.0.1:8000/api/weapons?${params}`)
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
                setItemsStatsType(result.stats.total_by_type)
                setItemsStatsSide(result.stats.total_by_sides)

                storeLocal('Weapons_module',JSON.stringify(result))
            },
            (error) => {
                Swal.close()
                if(getLocal('Weapons_module')){
                    setError(null)
                    setIsLoaded(true)
                    setDataStatus(<>This is a <b>local data</b> of <b>{getCleanTitleFromCtx(ctx)}</b>. We will fetch a new data when we success contact to server</>)
                    Swal.fire({
                        icon: "warning",
                        title: "Oops...",
                        text: "Something went wrong! But we still have recovered data to show you",
                    })

                    const res_backup = JSON.parse(getLocal('Weapons_module'))
                    setMaxPage(res_backup.data_all.last_page)
                    setCurrPage(res_backup.data_all.current_page)
                    setItems(res_backup.data_all.data)  

                    setItemsStatsCountry(res_backup.stats.total_by_country)
                    setItemsStatsType(res_backup.stats.total_by_type)
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
            column_name: "Type",
            object_name: "type",
            extra_desc: null
        },
        {
            column_name: "Country",
            object_name: "country",
            extra_desc: null
        },
        {
            column_name: "Manage",
            object_name: null
        }
    ]

    if (error) {
        return (
            <div>
                <h2>{getCleanTitleFromCtx(ctx)}</h2> 
                <div className='alert alert-danger' type='alert'>
                    <h4><FontAwesomeIcon icon={faWarning}/> Error</h4>
                    {error.message}
                </div>
            </div>
        )
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
                    dataStatus && (
                        <div className='alert alert-warning' type='alert'>
                            <h4><FontAwesomeIcon icon={faWarning}/> Warning</h4>
                            {dataStatus}
                        </div>
                    )
                }
                <div className='mb-3'>
                    <AtomsText body="All Weapons" text_type="sub_heading"/>
                    <GetGeneralTable builder={builder} items={items} maxPage={maxPage} currentPage={currPage} ctx={"Weapons"}/>  
                </div>
                <div className='mb-3'>
                    <AtomsText body="Total Weapons By Country" text_type="sub_heading"/>
                    <GetBarChart items={itemsStatsCountry} filter_name="Weapons_Country"/>  
                </div>
                <div className='mb-3'>
                    <AtomsText body="Total Weapons By Sides" text_type="sub_heading"/>
                    <GetPieChart items={itemsStatsSide} filter_name="Weapons_Sides"/>  
                </div>
                <div className='mb-3'>
                    <AtomsText body="Total Weapons By Type" text_type="sub_heading"/>
                    <GetPieChart items={itemsStatsType} filter_name="Weapons_type"/>  
                </div>
            </>
        )
    }
}
  