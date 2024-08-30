import React from 'react'
import container from './containers.module.css'
//Font awesome classicon
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircle, faGlobe } from "@fortawesome/free-solid-svg-icons"
import { faGithub, faInstagram, faLinkedin } from '@fortawesome/free-brands-svg-icons'
import AtomsBreakLine from '../../atoms/atoms_breakline'

export default function GetAboutContainer({items}) {
    return (
        <>
        {
            items.map((item, i, idx) => {
                return (
                    <div className={container.about_box}>
                        <img src={item['profile_pic']}></img>
                        <div className={container.body_box}>
                            <label className='mb-2'>{item['fullname']}</label>
                            <AtomsBreakLine length="1"/>
                            {
                                item['role'].map((data, j, idx2) => {
                                    return <>
                                        <span className={container.body_role}><FontAwesomeIcon icon={faCircle} size={'1x'} style={{color:"var(--primaryBG)", fontWeight:600}}/> {data} </span>
                                    </>
                                })
                            }
                            <p className='mt-3'>{item['mini_bio']}</p>
                            <hr style={{color:"var(--primaryBG)"}}></hr>
                            <a className={container.linkedin} href={container.instagram}><FontAwesomeIcon icon={faInstagram} size={'2x'} style={{color:"var(--primaryBG)", marginRight:10 ,fontWeight:600}}/></a>
                            <a className={container.btn_link} href={container.github}><FontAwesomeIcon icon={faGithub} size={'2x'} style={{color:"var(--primaryBG)", marginRight:10 , fontWeight:600}}/></a>
                            <a className={container.btn_link} href={container.linkedin}><FontAwesomeIcon icon={faLinkedin} size={'2x'} style={{color:"var(--primaryBG)", marginRight:10 , fontWeight:600}}/></a>
                            <a className={container.btn_link} href={container.website}><FontAwesomeIcon icon={faGlobe} size={'2x'} style={{color:"var(--primaryBG)", marginRight:10 , fontWeight:600}}/></a>
                        </div>
                    </div>
                )
            })
        }
        </>
    );
}
  