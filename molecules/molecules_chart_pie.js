import React from 'react'

import dynamic from 'next/dynamic';
import MoleculesFilterLimit from './molecules_filter_limit';
const Chart = dynamic(() => import('react-apexcharts'), { ssr: false });


export default function MoleculesChartPie({items, filter_name}) {
    //Initial variable
    var chart = [];

    //Converter
    const data = Object.values(items);

    const getSeries = (val) => {
        let catSeries = [];
        val.forEach(e => { 
            catSeries.push(parseInt(e.total))
        });
        return catSeries;
    }

    const getCategory = (val) => {
        let catData = [];
        val.forEach(e => { 
            catData.push(e.context)
        });
        return catData;
    }

    chart = {
        series: getSeries(data),
        options: {
            labels: getCategory(data)
        }
    };

    return (
        <div className='custom-tbody' style={{padding:"6px"}}>
            <div className="me-4">
                {
                    filter_name ? 
                        <MoleculesFilterLimit ctx={filter_name} type={"pie"}/>
                    :
                        <></>
                }
                <Chart
                    options={chart.options}
                    series={chart.series}
                    type="pie"
                />
            </div>
        </div>
    );
}
  