import Axios from 'axios'
import { useRef, useState } from 'react';
import Swal from 'sweetalert2';
import AtomsText from '../../../../atoms/atoms_text'
import GetDiscussionContainer from '../../../../components/containers/discussion_container'
import { getStringValJson } from '../../../../modules/helpers/generator';
import { getLocal } from '../../../../modules/storages/local';
import MoleculesChatBox from '../../../../molecules/molecules_chat_box'

export default function GetDiscussion(props) {
    const userToken = getLocal('token_key')
    const [body, setBody] = useState(null)
    const [msgAll, setResMsgAll] = useState(null)
    const bodyRef = useRef(null)

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

    return (
        <div>
            <AtomsText body="Discussion" text_type="sub_heading"/>
            {
                props.data.map((val, i, index) => {
                    return (
                        <GetDiscussionContainer props={val}/>
                    )
                })
            }
            {
                props.is_signed &&  <MoleculesChatBox handleSubmit={handleSubmit} messageRef={bodyRef} setMessage={(e)=>setBody(e.target.value)} is_with_attachment={true} context="discussion"/>
            }
        </div>
    )
}