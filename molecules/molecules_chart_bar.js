import React from 'react'

import dynamic from 'next/dynamic';
import MoleculesFilterLimit from './molecules_filter_limit';
import AtomsBreakLine from '../atoms/atoms_breakline';
const Chart = dynamic(() => import('react-apexcharts'), { ssr: false });


export default function MoleculesChartBar({items, filter_name}) {
    //Initial variable
    var chart = [];

    //Converter
    const data = Object.values(items);

    const getSeries = (val) => {
        let catSeries = [];
        val.forEach(e => { 
            catSeries.push({
                x: e.context,
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
                },
            },
        }
    };

    return (
        <div className='custom-tbody' style={{padding:"6px"}}>
            <div className="me-4">
                {
                    filter_name && 
                        <>
                            <MoleculesFilterLimit ctx={filter_name} type={"bar"}/>
                            <AtomsBreakLine length="2"/>
                        </>
                }
                <Chart
                    options={chart.options}
                    series={chart.series}
                    type="bar"
                    // height="800"
                />
            </div>
        </div>
    );
}
  