import React from 'react'

import dynamic from 'next/dynamic';
const Chart = dynamic(() => import('react-apexcharts'), { ssr: false });

import PageBar from '../organisms/organisms_page_bar'
import MoleculesFilterOrdering from './molecules_filter_ordering'
import MoleculesFilterLimit from './molecules_filter_limit'
import { numberWithCommas } from '../modules/helpers/math';

export default function MoleculesChartColumn({items, builder, maxPage, currentPage, ctx, height}) {
    //Initial variable
    var chart = [];

    //Converter
    const data = Object.values(items).reverse()

    const getSeries = (val, type) => {
        let catSeries = [];
        val.forEach(e => { 
            catSeries.push(parseInt(e[type]))
        })
        return catSeries
    }

    const buildSeries = (builder) => {
        let series = []
        builder.forEach(e => {
            series.push(
                {
                    name: e['column_name'],
                    data: getSeries(data, e['object_name'])
                }
            )
        })

        return series
    }

    const getCategory = (val) => {
        let catData = []
        val.forEach(e => { 
            catData.push(e.context)
        })
        return catData
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
                    return numberWithCommas(val)
                }
            }
            
            }
        }
    };

    return (
        <div className='custom-tbody' style={{overflowY:"hidden"}}>
            <MoleculesFilterOrdering ctx={ctx}/>
            <MoleculesFilterLimit ctx={ctx} type={"table"}/>
            <div className="mt-4">
                <Chart
                    options={chart.options}
                    series={chart.series}
                    height={height ?? '550'}
                    type="bar"
                />
            </div>
            <PageBar curr={currentPage} max={maxPage} ctx={ctx}/>
        </div>
    );
}
  