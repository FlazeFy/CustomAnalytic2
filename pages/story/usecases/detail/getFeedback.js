import detail from './detail.module.css'
import Axios from 'axios'
import ReactDOM from 'react-dom'
import GetFeedbackRate from '../../../../components/others/feedbackRate'
import MoleculesChatBox from '../../../../molecules/molecules_chat_box'
import AtomsText from '../../../../atoms/atoms_text'
import { getLocal } from '../../../../modules/storages/local'
import Swal from 'sweetalert2'
import { getStringValJson } from '../../../../modules/helpers/generator'
import { useRef, useState } from 'react'
import ReactStars from 'react-stars'

export default function GetFeedback(props) {
    const userToken = getLocal('token_key')
    const [body, setBody] = useState(null)
    const [rate, setRate] = useState(null)
    const [msgAll, setResMsgAll] = useState(null)
    const bodyRef = useRef(null)

    // Services
    const handleSubmit = async (e) => {
        if(body && body.trim() != ""){
            let ratingValue = 0

            Swal.fire({
                title: 'Also give us rating!',
                html: `<div id="react-stars-container" class="d-flex justify-content-center"></div>`,
                showCancelButton: true,
                preConfirm: () => {
                    return ratingValue || Swal.showValidationMessage('Please select a rating')
                }
            }).then((result) => {
                if (result.isConfirmed) {
                    setRate(parseInt(ratingValue))
                    submitFeedback(ratingValue)
                }
            });

            ReactDOM.render(
                <ReactStars count={5} onChange={(newRating) => { ratingValue = newRating }} size={24} color2={'var(--warningBG)'} half={false}/>,
                document.getElementById('react-stars-container')
            );
        } else {
            Swal.fire({
                title: 'Error!',
                text: `Feedback body can't be empty`,
                icon: 'error',
            });
        }
    };

    const submitFeedback = async (e) => {
        try {
            const data = new FormData()
            data.append('stories_id', props.id)
            data.append('body',body)
            data.append('rate',rate)
            
            const response = await Axios.post("http://127.0.0.1:8000/api/feedbacks", data, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    Authorization: `Bearer ${userToken}`
                }
            })
            if(response.status == 200){
                bodyRef.current.value = ''
                Swal.fire({
                    title: 'Success!',
                    text: response.data.message,
                    icon: 'success',
                });
            }
        } catch (error) {
            if (error.response) {
                const statusCode = error.response.status
                
                if(statusCode == 401 || statusCode == 422){
                    let msg = ''
                    if(statusCode == 401){
                        msg = error.response.data.message
                    } else {
                        msg = getStringValJson(error.response.data.message)
                    }

                    Swal.fire({
                        title: 'Error!',
                        text: msg,
                        icon: 'error',
                    });
                    setResMsgAll(error.response.message)
                }
            } else {
                Swal.fire({
                    title: 'Error!',
                    text: `Something wrong happen. Please contact admin`+error,
                    icon: 'error',
                });
                
                setResMsgAll(`Error: ${error.message}`)
            }
            setResMsgAll(error)
        }
    }

    return (
        <div>
            <AtomsText body="Feedback" text_type="sub_heading"/>
            {
                props.data.map((val, i, index) => {
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
            {
                props.is_signed && <MoleculesChatBox handleSubmit={handleSubmit} messageRef={bodyRef} setMessage={(e)=>setBody(e.target.value)} is_with_attachment={false} context="feedback"/>
            }
        </div>
    )
}