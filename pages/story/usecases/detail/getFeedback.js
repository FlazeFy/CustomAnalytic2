import detail from './detail.module.css'

import container from '../../../../components/containers/containers.module.css'
import GetFeedbackRate from '../../../../components/others/feedbackRate'

export default function GetFeedback({props}) {
    return (
        <div>
            <h4 className='section-title'>Feedback</h4>
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
            <br></br><hr className="section-line"></hr><br></br>
        </div>
    )
}