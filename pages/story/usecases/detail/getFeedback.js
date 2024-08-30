import detail from './detail.module.css'

import GetFeedbackRate from '../../../../components/others/feedbackRate'
import MoleculesChatBox from '../../../../molecules/molecules_chat_box'
import AtomsText from '../../../../atoms/atoms_text'

export default function GetFeedback({props}) {
    return (
        <div>
            <AtomsText body="Feedback" text_type="sub_heading"/>
            {
                props.map((val, i, index) => {
                    return (
                        <div className={detail.feedback_box}>
                            <div className="p-0 m-0">
                                <div className="d-inline-block position-relative me-2">
                                    <img className="img-profile" src="/images/default/default_admin.png" alt="username-profile-pic.png"></img>
                                </div>
                                <div className="d-inline-block position-relative">
                                    <h6 className="event-title">@{val.username}</h6>
                                    <GetFeedbackRate rate={val.rate} date={val.created_at}/>
                                </div>
                            </div>
                            <p>{val.body}</p>
                        </div>
                    )
                })
            }
            <MoleculesChatBox is_with_attachment={true} context="feedback"/>
        </div>
    )
}