import { faWarning } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'
import { useState, useEffect } from "react"
import Swal from 'sweetalert2'
import AtomsText from '../../../atoms/atoms_text'
import GetBarChart from '../../../components/charts/bar_chart'
import GetPieChart from '../../../components/charts/pie_chart'

// Component
import MoleculesTable from '../../../molecules/molecules_table'
import { getCleanTitleFromCtx } from '../../../modules/helpers/converter'

// Modules
import { getLocal, storeLocal } from '../../../modules/storages/local'
import MoleculesAlertBox from '../../../molecules/molecules_alert_box'

export default function GetVehiclesModule({ctx}) {
    //Initial variable
    const [error, setError] = useState(null)
    const [dataStatus, setDataStatus] = useState(null)
    const [isLoaded, setIsLoaded] = useState(false)
    const [userToken, setUserToken] = useState(null)

    const [maxPage, setMaxPage] = useState(0)
    const [currPage, setCurrPage] = useState(0)
    const [items, setItems] = useState([])
    const [itemsStatsCountry, setItemsStatsCountry] = useState([])
    const [itemsStatsRole, setItemsStatsRole] = useState([])
    const [itemsStatsSide, setItemsStatsSide] = useState([])

    useEffect(() => {
        Swal.showLoading()
        setUserToken(getLocal('token_key'))

        //Default config
        const keyPage = sessionStorage.getItem("Table_Vehicles")
        const keyOrder = sessionStorage.getItem("Table_order_Vehicles")
        const keyLimit = sessionStorage.getItem("Table_limit_Vehicles")
        const keySearch = sessionStorage.getItem("Table_search_Vehicles")

        if(keyPage == null){
            sessionStorage.setItem("Table_Vehicles", "1");
        }
        if(keyOrder == null){
            sessionStorage.setItem("Table_order_Vehicles", "asc");
        }
        if(keyLimit == null){
            sessionStorage.setItem("Table_limit_Vehicles", 15);
        }
        if(keySearch == null || keySearch.trim() == ""){
            sessionStorage.setItem("Table_search_Vehicles", "%20");
        }

        const params = new URLSearchParams({
            limit_data_all: keyLimit,
            order_data_all: keyOrder,
            search_data_all: keySearch,
            limit_stats_by_role: 7,
            limit_stats_by_country: 7
        })
        
        fetch(`http://127.0.0.1:8000/api/vehicles?${params}`)
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
                setItemsStatsSide(result.stats.total_by_sides)

                storeLocal('vehicles_module',JSON.stringify(result))
            },
            (error) => {
                Swal.close()
                if(getLocal('vehicles_module')){
                    setError(null)
                    setIsLoaded(true)
                    setDataStatus(<>This is a <b>local data</b> of <b>{getCleanTitleFromCtx(ctx)}</b>. We will fetch a new data when we success contact to server</>)
                    Swal.fire({
                        icon: "warning",
                        title: "Oops...",
                        text: "Something went wrong! But we still have recovered data to show you",
                    })

                    const res_backup = JSON.parse(getLocal('vehicles_module'))
                    setMaxPage(res_backup.data_all.last_page)
                    setCurrPage(res_backup.data_all.current_page)
                    setItems(res_backup.data_all.data)  

                    setItemsStatsCountry(res_backup.stats.total_by_country)
                    setItemsStatsRole(res_backup.stats.total_by_role)
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
                    <AtomsText body="All Vehicles" text_type="sub_heading"/>
                    <MoleculesTable builder={
                            userToken ?
                            [...builder,{
                                column_name: "Manage",
                                object_name: null,
                                extra_desc: null
                            }] : builder
                        } items={items} maxPage={maxPage} currentPage={currPage} ctx={"Vehicles"}/>  
                </div>
                <div className='mb-3'>
                    <AtomsText body="Total Vehicles By Country" text_type="sub_heading"/>
                    <GetBarChart items={itemsStatsCountry} filter_name="Vehicles_Country"/>  
                </div>
                <div className='mb-3'>
                    <AtomsText body="Total Vehicles By Sides" text_type="sub_heading"/>
                    <GetPieChart items={itemsStatsSide} filter_name="Vehicles_Sides"/>  
                </div>
                <div className='mb-3'>
                    <AtomsText body="Total Vehicles By Role" text_type="sub_heading"/>
                    <GetPieChart items={itemsStatsRole} filter_name="Vehicles_Role"/>  
                </div>
            </>
        )
    }
}
  