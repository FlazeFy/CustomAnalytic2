import React from 'react'
import { useState, useEffect } from "react"
import Image from 'next/image'

import dynamic from 'next/dynamic';
const Chart = dynamic(() => import('react-apexcharts'), { ssr: false });

//Font awesome classicon
import { library } from "@fortawesome/fontawesome-svg-core"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { } from "@fortawesome/free-solid-svg-icons"

export default function TotalVehiclesByCountry() {
    //Initial variable
    const [error, setError] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const [items, setItems] = useState([]);
    var chart = [];

    //Converter
    const data = Object.values(items);

    useEffect(() => {
        fetch("https://ww2.leonardhors.site/api/v1/vehicles/total/bycountry")
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
            catSeries.push({
                x: e.country,
                y: parseInt(e.total)
            });
        });
        return catSeries;
    }

    chart = {
        //series: getSeries(data),
        series: [{
            data: getSeries(data)}],
        options: {
            plotOptions: {
                bar: {
                  horizontal: true,
                  borderRadius: 8,
                }
            },
        }
    };

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
            <div className='custom-tbody' style={{padding:"6px"}}> {/*Fix the max height*/}
                <h6>Total Vehicles By Country</h6>
                <div className="BalanceChart me-4">
                    <Chart
                        options={chart.options}
                        series={chart.series}
                        type="bar"
                        height="800"
                    />
                </div>
            </div>
        );
    }
}
  