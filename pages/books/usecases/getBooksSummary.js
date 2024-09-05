import React from 'react'
import { useState, useEffect } from "react"
import MoleculesAlertBox from '../../../molecules/molecules_alert_box';

export default function GetBooksSummary(props) {
    //Initial variable
    const [error, setError] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const [items, setItems] = useState([]);

    //Converter
    const data = Object.values(items);

    useEffect(() => {
        fetch("https://ww2-test.leonardhors.com/api/books/summary")
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
                    items && <div key={i} className='summary-box'>
                        Overall in this war, The most of the books are reviewed by <b className='text-primary'>{items.most_reviewed}</b> which have been reviewed about <b className='text-primary'>{items.total_reviewed_most}</b> book. 
                        Author with the most published book is <b className='text-primary'>{items.most_author}</b> which have been reviewed about <b className='text-primary'>{items.total_published_most}</b> book. 
                        Most of the book are published in the year of <b className='text-primary'>{items.most_published_year}</b>.
                    </div>
                }
            </div>
        );
    }
}
  