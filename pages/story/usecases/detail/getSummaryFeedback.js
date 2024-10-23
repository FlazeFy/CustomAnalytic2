import MoleculesAlertBox from '../../../../molecules/molecules_alert_box'
import AtomsText from '../../../../atoms/atoms_text'
import { getLocal } from '../../../../modules/storages/local'
import Swal from 'sweetalert2'
import { useEffect, useRef, useState } from 'react'
import ReactStars from 'react-stars'
import MoleculesChartBar from '../../../../molecules/molecules_chart_bar'
import AtomsBreakLine from '../../../../atoms/atoms_breakline'

export default function GetSummaryFeedback(props) {
    //Initial variable
    const [error, setError] = useState(null)
    const [isLoaded, setIsLoaded] = useState(false)
    const [items, setItems] = useState(null)
    const [stats, setStats] = useState(null)
    const [msgAll, setResMsgAll] = useState(null)

    useEffect(() => {
        fetchData()
    },[])

    const fetchData = () => {
        Swal.showLoading()
        fetch(`http://127.0.0.1:8000/api/feedbacks/stats/${props.id}`)
        .then(res => res.json())
            .then(
            (result) => {
                Swal.close()
                setIsLoaded(true)
                setItems(result.data)
                let stats_temp = []
                result.data.stats.forEach(el => {
                    stats_temp.push({
                        context:`${el.context} Star`,
                        total:el.total,
                    })
                });
                setStats(stats_temp)
            },
            (error) => {
                Swal.close()
                Swal.fire({
                    icon: "error",
                    title: "Oops...",
                    text: "Something went wrong!",
                })
                setError(error)
            }
        )
    } 

    if (error) {
        return <MoleculesAlertBox message={error.message} type='danger' context={`Story's feedback : ${router.query.slug}`}/>
    } else if (!isLoaded) {
        return (
            <div>
                <h5 className='text-center text-white mt-2 fst-italic'>Loading...</h5>
            </div>
        )
    } else {
        return (
            <div className='row'>
                <div className='col position-relative'>
                    <AtomsText body="Feedbacks & Ratings" text_type="sub_heading"/>
                    <AtomsBreakLine length={1}/>
                    <h1 className='d-inline-block' style={{fontSize:"calc(var(--textXJumbo)*2.25)", fontWeight:"bold", color:"var(--warningBG)"}}>{items.summary.average.toFixed(1)}</h1>
                    <h1 className='d-inline-block' style={{fontSize:"var(--textLG)", fontWeight:"500", color:"var(--warningBG)"}}>out of 5</h1>
                    <h3 className='d-inline-block position-absolute' style={{fontSize:"var(--textXMD)", bottom:"15px", right:0, color:"var(--whiteColor)"}}>{items.summary.total+' Ratings'}</h3>
                </div>
                <div className='col'>
                    <MoleculesChartBar items={stats} filter_name={null} height='140px' cls='p-0' with_toolbar={false} with_grid={false} max_xaxis={5}/>  
                </div>
            </div>
        )
    }
}