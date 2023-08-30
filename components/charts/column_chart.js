import React from 'react'

import dynamic from 'next/dynamic';
const Chart = dynamic(() => import('react-apexcharts'), { ssr: false });

//Font awesome classicon
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEllipsisVertical } from "@fortawesome/free-solid-svg-icons"

export default function GetColumnChart({items, builder, maxPage, ctx}) {
    //Initial variable
    var chart = [];

    //Converter
    const data = Object.values(items).reverse();

    function getSeries(val, type){
        let catSeries = [];
        val.forEach(e => { 
            catSeries.push(parseInt(e[type]));
        });
        return catSeries;
    }

    function buildSeries(builder){
        let series = []
        builder.forEach(e => {
            series.push(
                {
                    name: e['column_name'],
                    data: getSeries(data, e['object_name'])
                }
            )
        });

        return series
    }

    function getCategory(val){
        let catData = [];
        val.forEach(e => { 
            catData.push(e.context);
        });
        return catData;
    }

    function numberWithCommas(x) {
        return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }

    chart = {
        series: buildSeries(builder),
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
                return numberWithCommas(val);
                }
            }
            
            }
        }
    };

    //Chart filter and config
    function setLimit(page){
        sessionStorage.setItem(`Column_Chart_${ctx}`, page);
        location.reload();
    }

    return (
        <div className='custom-tbody' style={{overflowY:"hidden"}}>
            <p>Page : {sessionStorage.getItem(`Column_Chart_${ctx}`)} / {maxPage}</p>
            <div className="dropdown">
                <button className="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false">
                    <FontAwesomeIcon icon={faEllipsisVertical}/></button>
                <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton1">
                    <li>
                        <a className="dropdown-item">
                            <label className='input-number-label'>Chart Page <span className='label-max'>Max : {maxPage}</span></label>
                            <input type="number" className='form-control' min="1" max={maxPage} defaultValue={sessionStorage.getItem(`Column_Chart_${ctx}`)} onBlur={(e)=> setLimit(e.target.value)}></input>
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
  