import { useState } from 'react'
import OrganismsTopCreator from '../../../organisms/organisms_top_creator'

export default function GetTopStories(props) {
    //Initial variable
    const [error, setError] = useState(null)
    const [isLoaded, setIsLoaded] = useState(false)
    const [items, setItems] = useState(null)

    const dummy = [
        {
            created_by : 'Jhon Doe',
            main_title : 'Lorem ipsum',
            img_url : '',
            average_rate : 4.5,
            total_feedback: 10,
            total_discuss: 14,
            story_type : 'battle'
        },
        {
            created_by : 'Jhon Doe',
            main_title : 'Lorem ipsum',
            img_url : '',
            average_rate : 4.5,
            total_feedback: 10,
            total_discuss: 14,
            story_type : 'battle'
        },
        {
            created_by : 'Jhon Doe',
            main_title : 'Lorem ipsum',
            img_url : '',
            average_rate : 4.5,
            total_feedback: 10,
            total_discuss: 14,
            story_type : 'battle'
        }
    ]

    return (
        <div>
            <div id="carouselFeedback" className="carousel slide mt-4 position-relative" data-bs-ride="carousel">
                <div className="carousel-indicators position-absolute mb-2" style={{top:"-10px"}}>
                    {
                        dummy.map((dt, idx) => {
                            if (idx % 3 === 0) {
                                return <button type="button" data-bs-target="#carouselFeedback" data-bs-slide-to={Math.floor(idx / 2)} className={idx === 0 ? 'active' : ''} aria-label={`Slide ${Math.floor(idx / 2) + 1}`} key={idx}></button>
                            }
                            return null;
                        })
                    }
                </div>
                <div className="carousel-inner mt-4 pt-4">
                    {
                        dummy.map((dt, idx) => {
                            if (idx % 3 === 0) {
                                return (
                                    <div className={`carousel-item pe-3 ${idx === 0 ? 'active' : ''}`} key={idx}>
                                        <div className="row">
                                            {[0, 1, 2, 3].map((offset) => 
                                                dummy[idx + offset] && (
                                                    <div className="col" key={idx + offset}>
                                                        <OrganismsTopCreator idx={idx + offset} type='story' username={dummy[idx + offset].created_by} main_title={dummy[idx + offset].main_title} average_rate={dummy[idx + offset].average_rate} 
                                                            total_feedback={dummy[idx + offset].total_feedback} total_discuss={dummy[idx + offset].total_discuss} story_type={dummy[idx + offset].story_type} created_by={dummy[idx + offset].created_by}/>
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