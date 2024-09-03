import Axios from 'axios'
import { useEffect, useRef, useState } from 'react';
import Swal from 'sweetalert2';
import AtomsText from '../../../../atoms/atoms_text'
import { getStringValJson } from '../../../../modules/helpers/generator';
import { getLocal } from '../../../../modules/storages/local';
import MoleculesAlertBox from '../../../../molecules/molecules_alert_box';
import MoleculesChatBox from '../../../../molecules/molecules_chat_box'
import OrganismsDiscussionBox from '../../../../organisms/organisms_discussion_box';

export default function GetDiscussion(props) {
    const [error, setError] = useState(null)
    const [isLoaded, setIsLoaded] = useState(false)
    const [items, setItems] = useState(null)
    const userToken = getLocal('token_key')
    const [body, setBody] = useState(null)
    const [msgAll, setResMsgAll] = useState(null)
    const bodyRef = useRef(null)
    const [currPage, setCurrPage] = useState(1)

    useEffect(() => {
        fetchData()
    },[])

    const fetchData = () => {
        Swal.showLoading()
        fetch(`http://127.0.0.1:8000/api/discussions/limit/14/order/desc/${props.id}?page=${currPage}`)
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
            try {
                const data = new FormData()
                data.append('stories_id', props.id)
                data.append('reply_id', null)
                data.append('body', body)
                data.append('attachment',null)
                
                const response = await Axios.post("http://127.0.0.1:8000/api/discussions", data, {
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
        } else {
            Swal.fire({
                title: 'Error!',
                text: `Discussion body can't be empty`,
                icon: 'error',
            });
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
                <AtomsText body="Discussion" text_type="sub_heading"/>
                {
                    items.map((dt, idx) => {
                        return (
                            <OrganismsDiscussionBox key={idx} body={dt.body} role={dt.role} created_at={dt.created_at} created_by={dt.created_by}/>
                        )
                    })
                }
                {
                    props.is_signed &&  <MoleculesChatBox handleSubmit={handleSubmit} messageRef={bodyRef} setMessage={(e)=>setBody(e.target.value)} is_with_attachment={true} context="discussion"/>
                }
            </div>
        )
    }
}