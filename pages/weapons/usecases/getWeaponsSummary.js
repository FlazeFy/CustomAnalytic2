import React from 'react'
import { useState, useEffect } from "react"
import MoleculesAlertBox from '../../../molecules/molecules_alert_box';

export default function GetWeaponsSummary(props) {
    //Initial variable
    const [error, setError] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const [items, setItems] = useState([]);

    //Converter
    const data = Object.values(items);

    useEffect(() => {
        fetch("https://ww2-test.leonardhors.com/api/weapons/summary")
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
                    items &&
                        <div className='summary-box'>
                            Overall in this war, The most produced weapons by type is <b className='text-primary'>{items.most_produced}</b> which have been produced about <b className='text-primary'>{items.total}</b> variant. 
                            This weapon is mainly produced by <b className='text-primary'>{items.most_produced_by_country}</b>. Average country has produced about <b className='text-primary'>{items.average_by_country}</b> variant of weapon.
                        </div>
                }
            </div>
        );
    }
}
  