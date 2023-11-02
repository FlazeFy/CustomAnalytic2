import React from 'react'
import { useState, useEffect } from "react"

export default function CasualitiesSummary(props) {
    //Initial variable
    const [error, setError] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const [items, setItems] = useState([]);

    //Converter
    const data = Object.values(items);

    useEffect(() => {
        fetch("https://ww2.leonardhors.site/api/v1/casualities/summary")
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
                <h5 className='text-center text-white mt-2 fst-italic'>Loading...</h5>
            </div>
        );
    } else {
        function numberWithCommas(x) {
            return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
        }

        return (
            <div className='container' style={{padding:"6px"}}>
                <h6>Summary</h6>
                {
                    items.map((val, i, index) => {
                        return (
                            <div key={i} className='summary-box'>
                                Overall in this war, average death per country is <b className='text-primary'>{numberWithCommas(val.average_death)}</b>. 
                                Country with the most death toll is <b className='text-primary'>{numberWithCommas(val.highest_death_country)}</b> with <b className='text-primary'>{numberWithCommas(val.highest_death)}</b> military and civilian death.<br></br>
                                This total as much as <b className='text-primary'>{numberWithCommas(val.highest_death_country_percent)}%</b> of all total death combined, which is about <b className='text-primary'>{numberWithCommas(val.total_death_all)}</b> death.
                            </div>
                        );
                    })
                }
            </div>
        );
    }
}
  