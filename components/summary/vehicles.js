import React from 'react'
import { useState, useEffect } from "react"
import Image from 'next/image'

//Font awesome classicon
import { library } from "@fortawesome/fontawesome-svg-core"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { } from "@fortawesome/free-solid-svg-icons"

export default function VehiclesSummary(props) {
    //Initial variable
    const [error, setError] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const [items, setItems] = useState([]);

    //Converter
    const data = Object.values(items);

    useEffect(() => {
        fetch("http://127.0.0.1:8000/api/vehicles/summary")
        .then(res => res.json())
            .then(
            (result) => {
                setIsLoaded(true);
                setItems(result.data);
            },
            (error) => {
                setIsLoaded(true);
                setError(error);
            }
        )
    },[])

    if (error) {
        return <div>Error: {error.message}</div>;
    } else if (!isLoaded) {
        return (
            <div>
                {/* <Image
                    src="/loading.gif"
                    alt="Vercel Logo"
                    className='loading-logo'
                    width={100}
                    height={100}
                    priority
                /> */}
                <h5 className='text-center text-white mt-2 fst-italic'>Loading...</h5>
            </div>
        );
    } else {
        return (
            <div className='container' style={{padding:"6px"}}>
                <h6>Summary</h6>
                {
                    items.map((val, i, index) => {
                        return (
                            <div key={i} className='summary-box'>
                                Overall in this war, The most produced vehicles by role is <b className='text-primary'>{val.most_produced}</b> which have been produced about <b className='text-primary'>{val.total}</b> variant. 
                                This role of vehicles is mainly produced by <b className='text-primary'>{val.most_produced_by_country}</b>. Average country has produced about <b className='text-primary'>{val.average_by_country}</b> variant of vehicles.
                            </div>
                        );
                    })
                }
            </div>
        );
    }
}
  