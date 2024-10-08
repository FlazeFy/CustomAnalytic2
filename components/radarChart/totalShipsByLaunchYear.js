import React from 'react'
import { useState, useEffect } from "react"

import dynamic from 'next/dynamic';
const Chart = dynamic(() => import('react-apexcharts'), { ssr: false });

//Font awesome classicon
import { library } from "@fortawesome/fontawesome-svg-core"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { } from "@fortawesome/free-solid-svg-icons"

export default function TotalShipsByLaunchYear() {
    //Initial variable
    const [error, setError] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const [items, setItems] = useState([]);
    var chart = [];

    //Converter
    const data = Object.values(items);

    useEffect(() => {
        fetch("http://127.0.0.1:8000/api/v1/ships/total/bylaunchyear")
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

    const getSeries = (val, diff) => {
        let catSeries = [];
        let start = 1892

        for(var i = 0; i < 7; i++){
            let total_period = 0

            val.forEach(e => { 
                if(parseInt(e.launch_year) > start+(diff*i)+1 && parseInt(e.launch_year) < start+(diff*(i+1))){
                    total_period += parseInt(e.total)
                }
            });
            catSeries.push(parseInt(total_period));

        }
        return catSeries;
    }

    const getCategory = (diff) => {
        let catData = []
        let start = 1892

        for(var i = 0; i < 7; i++){
            let period = (start+(diff*i)+1).toString()+'-'+(start+(diff*(i+1))).toString()
            catData.push(period)
        }
        return catData
    }

    chart = {
        series: [{
            name: 'Series 1',
            data: getSeries(data, 8),
        }],
        options: {
            chart: {
              height: 350,
              type: 'radar',
            },
            dataLabels: {
              enabled: true
            },
            colors: ['#FF4560'],
            markers: {
              size: 4,
              colors: ['#fff'],
              strokeColor: '#FF4560',
              strokeWidth: 2,
            },
            tooltip: {
              y: {
                formatter: function(val) {
                  return val
                }
              }
            },
            xaxis: {
              categories: getCategory(8)
            },
            yaxis: {
              tickAmount: 7,
              labels: {
                formatter: function(val, i) {
                  if (i % 2 === 0) {
                    return val
                  } else {
                    return ''
                  }
                }
              }
            }
          },
    };

    if (error) {
        return <div>Error: {error.message}</div>;
    } else if (!isLoaded) {
        return (
            <div>
                <h5 className='text-center text-white mt-2 fst-italic'>Loading...</h5>
            </div>
        );
    } else {
        return (
            <div className='custom-tbody' style={{padding:"6px"}}>
                <h6>Total Ships By Launch Year</h6>
                <div className="me-4">
                    <Chart
                        options={chart.options}
                        series={chart.series}
                        type="radar"
                        height="400"
                    />
                </div>
            </div>
        );
    }
}
  