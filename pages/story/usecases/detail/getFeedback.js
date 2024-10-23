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
        fetch(`http://127.0.0.1:8000/api/feedbacks/limit/14/order/desc/${props.id}?page=${currPage}`)
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
                html: `<div id="react-stars-container" className="d-flex justify-content-center"></div>`,
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
                <div id="carouselFeedback" className="carousel slide mt-4 position-relative" data-bs-ride="carousel">
                    <div className="carousel-indicators position-absolute mb-2" style={{top:"-10px"}}>
                        {
                            items.map((dt, idx) => {
                                if (idx % 2 === 0) {
                                    return <button type="button" data-bs-target="#carouselFeedback" data-bs-slide-to={Math.floor(idx / 2)} className={idx === 0 ? 'active' : ''} aria-label={`Slide ${Math.floor(idx / 2) + 1}`} key={idx}></button>
                                }
                                return null;
                            })
                        }
                    </div>
                    <div className="carousel-inner mt-4 pt-2">
                        {
                            items.map((dt, idx) => {
                                if (idx % 2 === 0) {
                                    return (
                                        <div className={`carousel-item pe-3 ${idx === 0 ? 'active' : ''}`} key={idx}>
                                            <div className="row">
                                                <div className="col">
                                                    <OrganismsFeedbackBox key={idx} body={dt.body} created_at={dt.created_at} created_by={dt.created_by} rate={dt.rate}/>
                                                </div>
                                                {
                                                    items[idx + 1] && (
                                                        <div className="col">
                                                            <OrganismsFeedbackBox key={idx + 1} body={items[idx + 1].body} created_at={items[idx + 1].created_at} created_by={items[idx + 1].created_by} rate={items[idx + 1].rate}/>
                                                        </div>
                                                    )
                                                }
                                            </div>
                                        </div>
                                    )
                                }
                                return null
                            })
                        }
                    </div>
                    <div className='position-absolute mb-2' style={{top:"-10px",right:"0"}}>
                        <div className='position-relative'>
                            <button className="carousel-control-prev position-absolute" style={{left:'-90px'}} type="button" data-bs-target="#carouselFeedback" data-bs-slide="prev">Previous</button>
                            <button className="carousel-control-next position-absolute" style={{left:'-30px'}} type="button" data-bs-target="#carouselFeedback" data-bs-slide="next">Next</button>
                        </div>
                    </div>
                </div>
                {
                    props.is_signed && <MoleculesChatBox handleSubmit={handleSubmit} messageRef={bodyRef} setMessage={(e)=>setBody(e.target.value)} is_with_attachment={false} context="feedback"/>
                }
            </div>
        )
    }
}