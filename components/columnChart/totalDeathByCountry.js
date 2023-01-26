import React from 'react'
import { useState, useEffect } from "react"
import Image from 'next/image'

import dynamic from 'next/dynamic';
const Chart = dynamic(() => import('react-apexcharts'), { ssr: false });

//Font awesome classicon
import { library } from "@fortawesome/fontawesome-svg-core"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEllipsisVertical } from "@fortawesome/free-solid-svg-icons"

export default function TotalDeathByCountry() {
    //Initial variable
    const [error, setError] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const [items, setItems] = useState([]);
    const [maxPage, setMaxPage] = useState([]);
    var chart = [];

    //Converter
    const data = Object.values(items).reverse();

    useEffect(() => {
        //Default config
        if(sessionStorage.getItem("ChartPage_DeathByCountry") == null){
            sessionStorage.setItem("ChartPage_DeathByCountry", "1");
        }

        fetch("http://127.0.0.1:8000/api/casualities/totaldeath/bycountry/DESC/limit/10?page="+sessionStorage.getItem("ChartPage_DeathByCountry"))
        .then(res => res.json())
            .then(
            (result) => {
                setIsLoaded(true);
                setMaxPage(result.data.last_page);
                setItems(result.data.data);
            },
            (error) => {
                setIsLoaded(true);
                setError(error);
            }
        )
    },[])

    function getSeries(val, type){
        let catSeries = [];
        val.forEach(e => { 
            if(type == "Military"){
                catSeries.push(parseInt(e.military_death));
            } else if(type == "Civilian"){
                catSeries.push(parseInt(e.civilian_death));
            } else if(type == "Total"){
                catSeries.push(parseInt(e.total));
            }
        });
        return catSeries;
    }

    function getCategory(val){
        let catData = [];
        val.forEach(e => { 
            catData.push(e.country);
        });
        return catData;
    }

    chart = {
        series: [
            {
                name: 'Military Death',
                data: getSeries(data, "Military")
            },
            {
                name: 'Civilian Death',
                data: getSeries(data, "Civilian")
            },
            {
                name: 'Total Death',
                data: getSeries(data, "Total")
            },
        ],
        options: {
            chart: {
                height: 350,
                type: 'bar',
            },
            plotOptions: {
                bar: {
                    borderRadius: 4,
                    dataLabels: {
                    position: 'top', // top, center, bottom
                    },
                }
            },
            dataLabels: {
                enabled: false,
            },
            
            xaxis: {
            categories: getCategory(data),
            position: 'top',
            axisBorder: {
                show: false
            },
            axisTicks: {
                show: false
            },
            crosshairs: {
                fill: {
                type: 'gradient',
                gradient: {
                        colorFrom: '#D8E3F0',
                        colorTo: '#BED1E6',
                        stops: [0, 100],
                        opacityFrom: 0.4,
                        opacityTo: 0.5,
                    }
                }
            },
            tooltip: {
                enabled: true,
            }
            },
            yaxis: {
            axisBorder: {
                show: false
            },
            axisTicks: {
                show: false,
            },
            labels: {
                show: false,
                formatter: function (val) {
                return val;
                }
            }
            
            }
        }
    };

    //Chart filter and config
    function setLimit(page){
        sessionStorage.setItem("ChartPage_DeathByCountry", page);
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
            <div className='custom-tbody'>
                <h6>Total Death By Country</h6>
                <p>Page : {sessionStorage.getItem("ChartPage_DeathByCountry")} / {maxPage}</p>
                <div className="dropdown">
                    <button className="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false">
                        <FontAwesomeIcon icon={faEllipsisVertical}/></button>
                    <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton1">
                        <li>
                            <a className="dropdown-item">
                                <label className='input-number-label'>Chart Page <span className='label-max'>Max : {maxPage}</span></label>
                                <input type="number" className='form-control' min="1" max={maxPage} defaultValue={sessionStorage.getItem("ChartPage_DeathByCountry")} onBlur={(e)=> setLimit(e.target.value)}></input>
                            </a>
                        </li>
                    </ul>
                </div>
                <div className="mt-4">
                    <Chart
                        options={chart.options}
                        series={chart.series}
                        type="bar"
                        height="550"
                    />
                </div>
            </div>
        );
    }
}
  