import React from 'react'
import { useState, useEffect } from "react"
import AtomsText from '../../../atoms/atoms_text';
import MoleculesAlertBox from '../../../molecules/molecules_alert_box';

export default function GetShipsSummary(props) {
    //Initial variable
    const [error, setError] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const [items, setItems] = useState([]);

    useEffect(() => {
        fetch("http://127.0.0.1:8000/api/ships/summary")
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
                <AtomsText text_type="sub_heading" body="Summary"/>
                {
                    items && <div className='summary-box'>
                            Overall in this war, The most produced ships by class is <b className='text-primary'>{items.most_produced}</b> which have been produced about <b className='text-primary'>{items.total}</b> variant. 
                            This class of ships is mainly produced by <b className='text-primary'>{items.most_produced_by_country}</b>. Average country has produced about <b className='text-primary'>{items.average_by_country}</b> variant of ships. 
                            Most of these ships built on year of <b className='text-primary'>{items.most_built_year}</b>.
                        </div>
                }
            </div>
        );
    }
}
  