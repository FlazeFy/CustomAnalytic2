import Axios from 'axios'
import ReactDOM from 'react-dom'
import MoleculesChatBox from '../../../molecules/molecules_chat_box'
import MoleculesAlertBox from '../../../molecules/molecules_alert_box'
import AtomsText from '../../../atoms/atoms_text'
import { getLocal } from '../../../modules/storages/local'
import Swal from 'sweetalert2'
import { getStringValJson } from '../../../modules/helpers/generator'
import { useEffect, useRef, useState } from 'react'
import ReactStars from 'react-stars'
import OrganismsFeedbackBox from '../../../organisms/organisms_feedback_box'
import OrganismsTopCreator from '../../../organisms/organisms_top_creator'

export default function GetTopCreator(props) {
    //Initial variable
    const [error, setError] = useState(null)
    const [isLoaded, setIsLoaded] = useState(false)
    const [items, setItems] = useState(null)

    const dummy = [
        {
            username : 'Jhon Doe',
            joined_at : '2024-08-29 03:28:54',
            average_rate : 4.5,
            total_stories: 10,
            most_type : 'battle'
        },
        {
            username : 'Jhon Doe',
            joined_at : '2024-08-29 03:28:54',
            average_rate : 4.5,
            total_stories: 10,
            most_type : 'battle'
        },
        {
            username : 'Jhon Doe',
            joined_at : '2024-08-29 03:28:54',
            average_rate : 4.5,
            total_stories: 10,
            most_type : 'battle'
        },
        {
            username : 'Jhon Doe',
            joined_at : '2024-08-29 03:28:54',
            average_rate : 4.5,
            total_stories: 10,
            most_type : 'battle'
        }
    ]

    return (
        <div>
            <div id="carouselFeedback" className="carousel slide mt-4 position-relative" data-bs-ride="carousel">
                <div className="carousel-indicators position-absolute mb-2" style={{top:"-10px"}}>
                    {
                        dummy.map((dt, idx) => {
                            if (idx % 4 === 0) {
                                return <button type="button" data-bs-target="#carouselFeedback" data-bs-slide-to={Math.floor(idx / 2)} className={idx === 0 ? 'active' : ''} aria-label={`Slide ${Math.floor(idx / 2) + 1}`} key={idx}></button>
                            }
                            return null;
                        })
                    }
                </div>
                <div className="carousel-inner mt-4">
                    {
                        dummy.map((dt, idx) => {
                            if (idx % 4 === 0) {
                                return (
                                    <div className={`carousel-item pe-3 ${idx === 0 ? 'active' : ''}`} key={idx}>
                                        <div className="row">
                                            {[0, 1, 2, 3].map((offset) => 
                                                dummy[idx + offset] && (
                                                    <div className="col" key={idx + offset}>
                                                        <OrganismsTopCreator username={dummy[idx + offset].username} joined_at={dummy[idx + offset].joined_at} average_rate={dummy[idx + offset].average_rate} 
                                                            total_stories={dummy[idx + offset].total_stories} most_type={dummy[idx + offset].most_type}/>
                                                    </div>
                                                )
                                            )}
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
        </div>
    )
}