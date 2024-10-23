import React from 'react'

import dynamic from 'next/dynamic';
import MoleculesFilterLimit from './molecules_filter_limit';
import AtomsBreakLine from '../atoms/atoms_breakline';
const Chart = dynamic(() => import('react-apexcharts'), { ssr: false });


export default function MoleculesChartBar({items, filter_name, height, cls, with_toolbar, with_grid, max_xaxis}) {
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
            chart: {
                toolbar: {
                    show: with_toolbar ?? true
                }
            },
            plotOptions: {
                bar: {
                    horizontal: true,
                    borderRadius: 8,
                },
            },
            grid : {
                show:with_grid ?? true
            },
            xaxis: {
                // max: max_xaxis ?? null,
                axisTicks: {
                    show: false 
                }
            }
        }
    };

    return (
        <div className={cls ?? 'custom-tbody'} style={{padding:"6px"}}>
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
                    height={height ?? 'auto'}
                    type="bar"
                />
            </div>
        </div>
    );
}
  