import GetBarChart from "../../../../components/charts/bar_chart";
import GetPieChart from "../../../../components/charts/pie_chart";
import { getCleanTitleFromCtx } from "../../../../modules/helpers/converter";

export default function GetStats({props}) {
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
                                        <h6>Pie Chart</h6>
                                        <GetPieChart items={val.data} is_filtered={false} filter_name={null}/>  
                                    </div>
                                    <div className="col-6">
                                        <h6>Bar Chart</h6>
                                        <GetBarChart items={val.data}/>
                                    </div>
                                </div><br></br>
                            </>
                        )
                    } else {
                        return <p>No chart available</p>
                    }
                    
                })
            }
            <br></br><hr className="section-line"></hr><br></br>
        </div>
    )
}