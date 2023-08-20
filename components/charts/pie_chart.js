import React from 'react'
import Image from 'next/image'

import dynamic from 'next/dynamic';
const Chart = dynamic(() => import('react-apexcharts'), { ssr: false });

//Font awesome classicon
import { library } from "@fortawesome/fontawesome-svg-core"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCheck, faEllipsisVertical } from "@fortawesome/free-solid-svg-icons"

export default function GetPieChart({items, is_filtered, filter_name}) {
    //Initial variable
    var chart = [];

    //Converter
    const data = Object.values(items);

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
            catData.push(e.context);
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
        sessionStorage.setItem(`chart_filter_${filter_name}_sess`, type);
        location.reload();
    }

    return (
        <div className='custom-tbody' style={{padding:"6px"}}>
            <div className="BalanceChart me-4">
                {is_filtered ? (
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
                ) : (
                    <div className="">
                    </div>
                )}
                <Chart
                    options={chart.options}
                    series={chart.series}
                    type="pie"
                />
            </div>
        </div>
    );
}
  