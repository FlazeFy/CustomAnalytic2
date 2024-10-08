import container from '../../../../organisms/organisms.module.css'
import detail from './detail.module.css'

//Font awesome classicon
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCalendar, faLocationDot, faTriangleExclamation } from "@fortawesome/free-solid-svg-icons"
import { ucFirst } from '../../../../modules/helpers/typography'
import AtomsText from '../../../../atoms/atoms_text'
import AtomsBreakLine from '../../../../atoms/atoms_breakline'

export default function GetInfo(props) {
    return (
        <div>
            <AtomsText text_type="main_heading" body={<>
                {props.data.main_title} <span style={{fontSize:"var(--textXL)", position:"relative",top:0, marginLeft:"var(--spaceMD)"}} className={container.story_type}>{ucFirst(props.data.story_type)}</span>
            </>}/>
            {
                props.data.story_location ? 
                    <p><FontAwesomeIcon icon={faLocationDot}/> {props.data.story_location}</p>
                :
                    <></>
            }
            {
                !props.data.is_finished ? 
                    <p className={detail.story_status}><FontAwesomeIcon icon={faTriangleExclamation}/> This {props.data.story_type} is still on going. From {props.data.date_start}</p>
                :
                    <p><FontAwesomeIcon icon={faCalendar}/> Start from {props.data.date_start} until {props.data.date_end}</p>
            }
            <hr className="section-line"></hr>
            <div className='row'>
                <div className='col'>
                    <AtomsText body={
                        <>Result <span style={{fontSize:"var(--textXMD)", position:"relative",top:0, marginLeft:"var(--spaceMD)"}} className={container.story_type}>
                        {
                            props.data.story_result.map((val,index) => {
                                if (val.result_summary) {
                                    return ucFirst(val.result_summary)
                                }
                            })
                        }   
                        </span></>
                        } text_type="sub_heading"/>
                    {
                        props.data.story_result.map((val,idx) => {
                            if (val.result_content) {
                                return <li key={`content_${idx}`}>{val.result_content}</li>
                            }
                        })
                    }
                </div>
                <div className='col'>
                    <AtomsText body={'Tags'} text_type="sub_heading"/>
                    {
                        props.data.story_tag.map((val,idx) => {
                            return  <a className='tag-box' key={`tag_${idx}`}>#{val.tag_name}</a>
                        })
                    }
                </div>
            </div>
            <AtomsBreakLine length="1"/>
            <hr className="section-line"></hr>
            <AtomsBreakLine length="1"/>
        </div>
    )
}