import { faCrown, faHashtag } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import AtomsBreakLine from '../atoms/atoms_breakline'
import AtomsText from '../atoms/atoms_text'
import { ucFirst } from '../modules/helpers/typography'
import container from './organisms.module.css'
import style from './organisms.module.css'

export default function OrganismsTopCreatorStories(props) {
    return (
        <div className={style.user_box}>
            {
                props.idx == 0 ?
                    <FontAwesomeIcon icon={faCrown} color={'var(--warningBG)'} className='position-absolute' style={{left:'0',top:'-27.5px', transform:'rotate(-10deg)', height:'40px'}}/>
                :
                    <span className='position-absolute fst-italic fw-bold' style={{left:'10px',top:'10px', height:'26px', color:'var(--warningBG)'}}><FontAwesomeIcon icon={faHashtag}/>{props.idx + 1}</span>
            }
            <img className={props.type == 'creator' ? "img-profile mx-auto mb-3" : "w-100 rounded mx-auto mb-3"} src={props.type == 'creator' ?"/images/default/default_admin.png":"/images/default/default_content.jpg"} alt="username-profile-pic.png"></img>
            <AtomsText body={props.type == 'creator' ? props.username : props.main_title} text_type="mini_sub_heading"/>
            <a style={{color:'white', fontSize:'var(--textXSM)', fontStyle:'italic'}}>{props.type == 'creator' ? 'Joined since' : 'Posted by @'+props.username} {props.joined_at}</a>
            <hr className='section-line'></hr>
            <AtomsText body={'Average Rates : '+props.average_rate} text_type="main_content"/>
            <AtomsText body={`Total Feedback / Discuss : ${props.type == 'creator' ? props.total_stories : props.total_feedback + ' / ' +props.total_discuss}`} text_type="main_content"/>
            <div className='mt-1'>
                {
                    props.type == 'creator' && <AtomsText body={'Most Posted Story'} text_type="main_content"/>
                }
                <span style={{fontSize:"var(--textMD)", position:"relative",top:"6px", marginLeft:"var(--spaceLG)"}} className={container.story_type}>{ucFirst(props.type == 'creator' ? props.most_type : props.story_type)}</span>
            </div>
        </div>
    )
}