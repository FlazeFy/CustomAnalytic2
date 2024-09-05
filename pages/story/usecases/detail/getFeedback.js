import Axios from 'axios'
import ReactDOM from 'react-dom'
import MoleculesChatBox from '../../../../molecules/molecules_chat_box'
import MoleculesAlertBox from '../../../../molecules/molecules_alert_box'
import AtomsText from '../../../../atoms/atoms_text'
import { getLocal } from '../../../../modules/storages/local'
import Swal from 'sweetalert2'
import { getStringValJson } from '../../../../modules/helpers/generator'
import { useEffect, useRef, useState } from 'react'
import ReactStars from 'react-stars'
import OrganismsFeedbackBox from '../../../../organisms/organisms_feedback_box'

export default function GetFeedback(props) {
    //Initial variable
    const [error, setError] = useState(null)
    const [isLoaded, setIsLoaded] = useState(false)
    const [items, setItems] = useState(null)
    const userToken = getLocal('token_key')
    const [body, setBody] = useState(null)
    const [rate, setRate] = useState(null)
    const [msgAll, setResMsgAll] = useState(null)
    const bodyRef = useRef(null)
    const [currPage, setCurrPage] = useState(1)

    useEffect(() => {
        fetchData()
    },[])

    const fetchData = () => {
        Swal.showLoading()
        fetch(`https://ww2-test.leonardhors.com/api/feedbacks/limit/14/order/desc/${props.id}?page=${currPage}`)
        .then(res => res.json())
            .then(
            (result) => {
                Swal.close()
                setIsLoaded(true)
                setItems(result.data.data)
                setCurrPage(result.data.current_page)  
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
            
            const response = await Axios.post("https://ww2-test.leonardhors.com/api/feedbacks", data, {
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
                }).then((result) => {
                    if (result.isConfirmed) {
                        fetchData()
                    }
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
            <div>
                <AtomsText body="Feedback" text_type="sub_heading"/>
                {
                    items.map((dt, idx) => {
                        return (
                            <OrganismsFeedbackBox key={idx} body={dt.body} created_at={dt.created_at} created_by={dt.created_by} rate={dt.rate}/>
                        )
                    })
                }
                {
                    props.is_signed && <MoleculesChatBox handleSubmit={handleSubmit} messageRef={bodyRef} setMessage={(e)=>setBody(e.target.value)} is_with_attachment={false} context="feedback"/>
                }
            </div>
        )
    }
}