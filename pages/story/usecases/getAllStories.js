import { faWarning } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'
import { useState, useEffect } from "react"
import Swal from 'sweetalert2'
import GetStoryContainer from '../../../components/containers/story_container'

// Component
import { getCleanTitleFromCtx } from '../../../modules/helpers/converter'

// Modules
import { getLocal, storeLocal } from '../../../modules/storages/local'
import MoleculesAlertBox from '../../../molecules/molecules_alert_box'

export default function GetAllStories({ctx}) {
    //Initial variable
    const [error, setError] = useState(null)
    const [dataStatus, setDataStatus] = useState(null)
    const [isLoaded, setIsLoaded] = useState(false)

    const [maxPage, setMaxPage] = useState(0)
    const [currPage, setCurrPage] = useState(0)
    const [items, setItems] = useState([])

    useEffect(() => {
        Swal.showLoading()
        //Default config
        const keyPage = sessionStorage.getItem("Table_Stories")
        const keyOrder = sessionStorage.getItem("Table_order_Stories")
        const keyLimit = sessionStorage.getItem("Table_limit_Stories")
        const keySearch = sessionStorage.getItem("Table_search_Stories")

        if(keyPage == null){
            sessionStorage.setItem("Table_Stories", "1");
        }
        if(keyOrder == null){
            sessionStorage.setItem("Table_order_Stories", "asc");
        }
        if(keyLimit == null){
            sessionStorage.setItem("Table_limit_Stories", 15);
        }
        if(keySearch == null || keySearch.trim() == ""){
            sessionStorage.setItem("Table_search_Stories", "%20");
        }

        fetch(`http://127.0.0.1:8000/api/stories/limit/${keyLimit}/order/${keyOrder}`)
        .then(res => res.json())
            .then(
            (result) => {
                Swal.close()
                setIsLoaded(true)
                setDataStatus(null)

                setMaxPage(result.data.last_page)
                setCurrPage(result.data.current_page)
                setItems(result.data.data)  

                storeLocal('All_Stories',JSON.stringify(result))
            },
            (error) => {
                Swal.close()
                if(getLocal('All_Stories')){
                    setError(null)
                    setIsLoaded(true)
                    setDataStatus(<>This is a <b>local data</b> of <b>{getCleanTitleFromCtx(ctx)}</b>. We will fetch a new data when we success contact to server</>)
                    Swal.fire({
                        icon: "warning",
                        title: "Oops...",
                        text: "Something went wrong! But we still have recovered data to show you",
                    })

                    const res_backup = JSON.parse(getLocal('Stories_module'))
                    setMaxPage(res_backup.data.last_page)
                    setCurrPage(res_backup.data.current_page)
                    setItems(res_backup.data.data)  
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
            <div className='row'> 
                {
                    items.map((dt,idx)=>{
                        return (
                            <div className='col-lg-4 col-md-6 col-sm-12 col-12'>
                                <GetStoryContainer data={dt}/>
                            </div>
                        )
                    })
                }
            </div>
        )
    }
}
  