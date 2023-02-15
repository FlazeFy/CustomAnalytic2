import React from 'react'
import { useState, useEffect } from "react"
import Image from 'next/image'

import dynamic from 'next/dynamic';
const Chart = dynamic(() => import('react-apexcharts'), { ssr: false });

//Font awesome classicon
import { library } from "@fortawesome/fontawesome-svg-core"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCheck, faEllipsisVertical } from "@fortawesome/free-solid-svg-icons"

export default function MostAuthorPublished() {
    //Initial variable
    const [error, setError] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const [items, setItems] = useState([]);
    const [chartFilter, setChart] = useState(["all", "authoronly"]);
    var chart = [];

    //Converter
    const data = Object.values(items);

    useEffect(() => {
        //Default config
        if(sessionStorage.getItem("ChartFilter_MostAuthor") == null){
            sessionStorage.setItem("ChartFilter_MostAuthor", "authoronly");
        }
        
        fetch("http://127.0.0.1:8000/api/books/most/byauthor/"+sessionStorage.getItem("ChartFilter_MostAuthor"))
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

    function getSeries(val){
        let catSeries = [];
        val.forEach(e => { 
            catSeries.push(parseInt(e.total));
        });
        return catSeries;
    }

    function getCategory(val){
        let catData = [];
        val.forEach(e => { 
            catData.push(e.author);
        });
        return catData;
    }

    chart = {
        series: getSeries(data),
        options: {
            labels: getCategory(data),
            plotOptions: {
                donut: {
                  size: 200
                }
            }
        }
    };

    //Chart filter and config
    function setCategory(type){
        sessionStorage.setItem("ChartFilter_MostAuthor", type);
        location.reload();
    }

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
            <div className='custom-tbody' style={{padding:"6px"}}>
                <h6>Author With Most Published Book</h6>
                <div className="dropdown">
                    <button className="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false">
                        <FontAwesomeIcon icon={faEllipsisVertical}/></button>
                    <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton1">
                    {
                        //Category type filter
                        chartFilter.map((val, i, index) => {
                        if(val == sessionStorage.getItem("ChartFilter_MostAuthor")){
                            return (
                                <li key={i}><a className="dropdown-item" onClick={(e)=> setCategory(val)}><FontAwesomeIcon icon={faCheck}/> {val}</a></li>
                            );
                        } else {
                            return (
                                <li key={i}><a className="dropdown-item" onClick={(e)=> setCategory(val)}>{val}</a></li>
                            );
                        }
                        })
                    }
                    </ul>
                </div>
                <Chart
                    options={chart.options}
                    series={chart.series}
                    type="pie"
                />
            </div>
        );
    }
}
  