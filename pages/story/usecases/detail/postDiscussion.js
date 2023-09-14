import detail from './detail.module.css'

//Font awesome classicon
import { library } from "@fortawesome/fontawesome-svg-core"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPaperPlane, faPlus } from "@fortawesome/free-solid-svg-icons"

export default function PostDiscussion() {
    return (
        <>
            <div className='position-relative'>
                <textarea className={detail.msg_text_box} placeholder="Type your message..."></textarea>
                <button className={detail.msg_text_send_btn} title="Send message"><FontAwesomeIcon icon={faPaperPlane}/> </button>
                <button className={detail.msg_text_ext_btn} title="Add attachment"><FontAwesomeIcon icon={faPlus}/> </button>
            </div>
            <br></br><hr className="section-line"></hr><br></br>
        </>
    )
}