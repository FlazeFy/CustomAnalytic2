import { useState, useEffect } from "react"
import AtomsBreakLine from "../../../../atoms/atoms_breakline";
import AtomsText from "../../../../atoms/atoms_text";

// Component
import MoleculesChartBar from "../../../../molecules/molecules_chart_bar";
import MoleculesChartPie from "../../../../molecules/molecules_chart_pie";
import { getCleanTitleFromCtx } from "../../../../modules/helpers/converter";

export default function GetStats({props}) {
    const filter_name = "Story_stats"
    useEffect(() => {
        //Default config
        const keyLimit = sessionStorage.getItem(`Pie_limit_${filter_name}`)
        if(keyLimit == null){
            sessionStorage.setItem(`Pie_limit_${filter_name}`, 5);
        }
    })

    return (
        <div>
            <h4 className='section-title'>Stats</h4>
            {
                props.map((val, i, index) => {
                    const len = val.data.length
                    if(len >= 2 && len <= 8){
                        return (
                            <>
                                <h5 style={{color:"var(--whiteColor)"}}>{getCleanTitleFromCtx(val.name)}</h5>
                                <div className="row">
                                    <div className="col-6">
                                        <AtomsText text_type="mini_sub_heading" body="Pie Chart"/>
                                        <MoleculesChartPie items={val.data} filter_name={filter_name}/>  
                                    </div>
                                    <div className="col-6">
                                        <AtomsText text_type="mini_sub_heading" body="Bar Chart"/>
                                        <MoleculesChartBar items={val.data}/>
                                    </div>
                                </div>
                                <AtomsBreakLine length="1"/>
                            </>
                        )
                    } else {
                        return <p>No chart available</p>
                    }
                    
                })
            }
            <AtomsBreakLine length="1"/>
            <hr className="section-line"></hr>
            <AtomsBreakLine length="1"/>
        </div>
    )
}