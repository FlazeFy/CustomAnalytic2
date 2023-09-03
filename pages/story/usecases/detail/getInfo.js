import container from '../../../../components/containers/containers.module.css'
import detail from './detail.module.css'

//Font awesome classicon
import { library } from "@fortawesome/fontawesome-svg-core"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCalendar, faLocationDot, faTriangleExclamation } from "@fortawesome/free-solid-svg-icons"

export default function GetInfo({props}) {
    return (
        <div>
            <h1>{props.main_title} <span style={{fontSize:"var(--textXL)", position:"relative",top:0, marginLeft:"var(--spaceMD)"}} className={container.story_type}>{props.type}</span></h1>
            {
                props.location ? 
                    <p><FontAwesomeIcon icon={faLocationDot}/> {props.location}</p>
                :
                    <></>
            }
            {
                !props.is_finished ? 
                    <p className={detail.story_status}><FontAwesomeIcon icon={faTriangleExclamation}/> This {props.type} is still on going. From {props.period_start}</p>
                :
                    <p><FontAwesomeIcon icon={faCalendar}/> Start from {props.period_start} until {props.period_end}</p>
            }
            <br></br>
            <div className='row'>
                <div className='col'>
                    <h4 className='section-title'>Result</h4>
                    {
                        props.result_detail.map((val, i, index) => {
                            return (
                                <li>{val}</li>
                            )
                        })
                    }
                </div>
                <div className='col'>
                    <h4 className='section-title'>Tags</h4>
                    {
                        props.tag.map((val, i, index) => {
                            return (
                                <a className='tag-box'>{val}</a>
                            )
                        })
                    }
                </div>
            </div>
            <hr className="section-line"></hr>  
        </div>
    )
}