"use client"
import React from 'react'
import Axios from 'axios'
import { useState } from 'react'
import Swal from 'sweetalert2'
import { getStringValJson } from '../modules/helpers/generator'
import OrganismsForm from './organisms_form'
import { faPlus } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import MoleculesModal from '../molecules/molecules_modal'
import { storeLocal } from '../modules/storages/local'

// Component

export default function OrganismsLogin(props) {
    //Initial variable
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")

    const [resMsgusername, setResMsgusername] = useState("")
    const [resMsgPassword, setResMsgPassword] = useState("")
    const [resMsgAll, setResMsgAll] = useState("")

    const builder = [
        {
            type: 'text',
            id:'username-input',
            class: 'form-control',
            label: 'username',
            placeholder: 'Type username',
            is_required: true,
            is_obsecure: false,
            max: 36,
            handleChange: (event) => {
                setUsername(event.target.value)
            },
            errorMsg: resMsgusername
        },
        {
            type: 'text',
            id:'pass-input',
            class: 'form-control',
            label: 'Password',
            placeholder: 'Type password',
            is_required: true,
            is_obsecure: true,
            max: 36,
            handleChange: (event) => {
                setPassword(event.target.value)
            },
            errorMsg: resMsgPassword
        },
        {
            type: 'submit',
            class: 'btn btn-success rounded-pill',
            id:'submit-btn',
            label: 'Submit',
            placeholder: null,
            toogle_disabled: false,
            handleClick: (event) => {
                handleSubmit(event)
            },
            errorMsg: resMsgAll
        }
    ]

    // Services
    const handleSubmit = async (e) => {
        try {
            const data = new FormData();
            data.append('username', username);
            data.append('password', password);
            
            const response = await Axios.post("https://ww2-test.leonardhors.com/api/login", data, {
                headers: {
                  'Content-Type': 'multipart/form-data'
                }
            })
            if(response.status == 200){
                storeLocal('token_key', response.data.token)
                storeLocal('role_key', response.data.role)
                storeLocal('username',response.data.result.username)
                // storeLocal('role')
                window.location.href = '/profile'
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
                    text: `Something wrong happen. Please contact admin`,
                    icon: 'error',
                });
                
                setResMsgAll(`Error: ${error.message}`)
            }
            setResMsgAll(error)
        }
    }

    return (
        <> 
            <MoleculesModal id={`login-form-modal`} title={`Login`} button_class="bgd-primary p-2 text-white"
                button_template={props.button_template}
                button_icon={<FontAwesomeIcon icon={faPlus} size="xl" className='me-2'/>}
                body={
                    <>
                        <OrganismsForm type={"single-line"} props={builder} />
                    </>
                }
            />
        </>
    )
}