import React from 'react'
import { useState, useEffect } from "react"
import MoleculesAlertBox from '../../../molecules/molecules_alert_box';

export default function GetFacilitiesSummary(props) {
    //Initial variable
    const [error, setError] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const [items, setItems] = useState([]);

    //Converter
    const data = Object.values(items);

    useEffect(() => {
        fetch("https://ww2-test.leonardhors.com/api/facilities/summary")
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
        return <MoleculesAlertBox message={error.message} type='danger' context={props.ctx}/>
    } else if (!isLoaded) {
        return (
            <div>
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
                                Overall in this war, The most built facilities by type is <b className='text-primary'>{val.most_built}</b> which have been built about <b className='text-primary'>{val.total}</b> facilities. 
                                This type of facilities is mainly produced by <b className='text-primary'>{val.most_built_by_country}</b>. Average country has built about <b className='text-primary'>{val.average_by_country}</b> facilities.
                            </div>
                        );
                    })
                }
            </div>
        );
    }
}
  