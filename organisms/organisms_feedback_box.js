import AtomsText from '../atoms/atoms_text'
import GetFeedbackRate from '../components/others/feedbackRate'
import style from './organisms.module.css'

export default function OrganismsFeedbackBox(props) {
    return (
        <div className={style.feedback_box}>
            <div className="p-0 m-0 mb-2">
                <div className="d-inline-block position-relative me-2">
                    <img className="img-profile" src="/images/default/default_admin.png" alt="username-profile-pic.png"></img>
                </div>
                <div className="d-inline-block position-relative">
                    <AtomsText body={props.created_by ? <>@{props.created_by}</> : 'Unknown User'} text_type="mini_sub_heading"/>
                    <GetFeedbackRate rate={props.rate} date={props.created_at}/>
                </div>
            </div>
            <AtomsText body={props.body} text_type="main_content"/>
        </div>
    )
}