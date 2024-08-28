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

export default function GetAircraftModule({ctx}) {
    //Initial variable
    const [error, setError] = useState(null)
    const [dataStatus, setDataStatus] = useState(null)
    const [isLoaded, setIsLoaded] = useState(false)

    const [maxPage, setMaxPage] = useState(0)
    const [currPage, setCurrPage] = useState(0)
    const [items, setItems] = useState([])
    const [itemsStatsCountry, setItemsStatsCountry] = useState([])
    const [itemsStatsRole, setItemsStatsRole] = useState([])
    const [itemsStatsSide, setItemsStatsSide] = useState([])
    const [itemsStatsManufacturer, setItemsStatsManufacturer] = useState([])

    useEffect(() => {
        Swal.showLoading()
        //Default config
        const keyPage = sessionStorage.getItem("Table_Aircraft")
        const keyOrder = sessionStorage.getItem("Table_order_Aircraft")
        const keyLimit = sessionStorage.getItem("Table_limit_Aircraft")
        const keySearch = sessionStorage.getItem("Table_search_Aircraft")

        if(keyPage == null){
            sessionStorage.setItem("Table_Aircraft", "1");
        }
        if(keyOrder == null){
            sessionStorage.setItem("Table_order_Aircraft", "asc");
        }
        if(keyLimit == null){
            sessionStorage.setItem("Table_limit_Aircraft", 15);
        }
        if(keySearch == null || keySearch.trim() == ""){
            sessionStorage.setItem("Table_search_Aircraft", "%20");
        }

        const params = new URLSearchParams({
            limit_data_all: keyLimit,
            order_data_all: keyOrder,
            search_data_all: keySearch,
            limit_stats_aircraft_by_role: 7,
            limit_stats_aircraft_by_country: 7,
            limit_stats_aircraft_by_manufacturer: 7
        })
        
        fetch(`http://127.0.0.1:8000/api/aircraft?${params}`)
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
                setItemsStatsRole(result.stats.total_by_role)
                setItemsStatsManufacturer(result.stats.total_by_manufacturer)
                setItemsStatsSide(result.stats.total_by_sides)

                storeLocal('aircraft_module',JSON.stringify(result))
            },
            (error) => {
                Swal.close()
                if(getLocal('aircraft_module')){
                    setError(null)
                    setIsLoaded(true)
                    setDataStatus(<>This is a <b>local data</b> of <b>{getCleanTitleFromCtx(ctx)}</b>. We will fetch a new data when we success contact to server</>)
                    Swal.fire({
                        icon: "warning",
                        title: "Oops...",
                        text: "Something went wrong! But we still have recovered data to show you",
                    })

                    const res_backup = JSON.parse(getLocal('aircraft_module'))
                    setMaxPage(res_backup.data_all.last_page)
                    setCurrPage(res_backup.data_all.current_page)
                    setItems(res_backup.data_all.data)  

                    setItemsStatsCountry(res_backup.stats.total_by_country)
                    setItemsStatsRole(res_backup.stats.total_by_role)
                    setItemsStatsManufacturer(res_backup.stats.total_by_manufacturer)
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
            column_name: "Primary Role",
            object_name: "primary_role",
            extra_desc: null
        },
        {
            column_name: "Manufacturer",
            object_name: "manufacturer",
            extra_desc: null
        },
        {
            column_name: "Country",
            object_name: "country",
            extra_desc: null
        },
        {
            column_name: "Manage",
            object_name: null,
            extra_desc: null
        }
    ]

    if (error) {
        return (
            <div>
                <h2>{getCleanTitleFromCtx(ctx)}</h2> 
                <div className='alert alert-danger' role='alert'>
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
                        <div className='alert alert-warning' role='alert'>
                            <h4><FontAwesomeIcon icon={faWarning}/> Warning</h4>
                            {dataStatus}
                        </div>
                    )
                }
                <div className='mb-3'>
                    <AtomsText body="All Airplane" text_type="sub_heading"/>
                    <GetGeneralTable builder={builder} items={items} maxPage={maxPage} currentPage={currPage} ctx={"Aircraft"}/>  
                </div>
                <div className='mb-3'>
                    <AtomsText body="Total Aircraft By Country" text_type="sub_heading"/>
                    <GetBarChart items={itemsStatsCountry} filter_name="Aircraft_Country"/>  
                </div>
                <div className='mb-3'>
                    <AtomsText body="Total Aircraft By Manufacturer" text_type="sub_heading"/>
                    <GetBarChart items={itemsStatsManufacturer} filter_name="Aircraft_Manufacturer"/>  
                </div>
                <div className='mb-3'>
                    <AtomsText body="Total Aircraft By Sides" text_type="sub_heading"/>
                    <GetPieChart items={itemsStatsSide} filter_name="Aircraft_Sides"/>  
                </div>
                <div className='mb-3'>
                    <AtomsText body="Total Aircraft By Role" text_type="sub_heading"/>
                    <GetPieChart items={itemsStatsRole} filter_name="Aircraft_Role"/>  
                </div>
            </>
        )
    }
}
  