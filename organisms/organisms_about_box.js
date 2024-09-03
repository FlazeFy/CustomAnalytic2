import React from 'react'
import style from './organisms.module.css'
//Font awesome classicon
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircle, faGlobe } from "@fortawesome/free-solid-svg-icons"
import { faGithub, faInstagram, faLinkedin } from '@fortawesome/free-brands-svg-icons'
import AtomsBreakLine from '../atoms/atoms_breakline'

export default function OrganismsAboutBox({items}) {
    return (
        <>
        {
            items.map((item, idx) => {
                return (
                    <div className={style.about_box} key={idx}>
                        <img src={item['profile_pic']}></img>
                        <div className={style.body_box}>
                            <label className='mb-2'>{item['fullname']}</label>
                            <AtomsBreakLine length="1"/>
                            {
                                item['role'].map((data, jdx) => {
                                    return <span key={jdx} className={style.body_role}><FontAwesomeIcon icon={faCircle} size={'1x'} style={{color:"var(--primaryBG)", fontWeight:600}}/> {data} </span>
                                })
                            }
                            <p className='mt-3'>{item['mini_bio']}</p>
                            <hr style={{color:"var(--primaryBG)"}}></hr>
                            <a className={style.linkedin} href={style.instagram}><FontAwesomeIcon icon={faInstagram} size={'2x'} style={{color:"var(--primaryBG)", marginRight:10 ,fontWeight:600}}/></a>
                            <a className={style.btn_link} href={style.github}><FontAwesomeIcon icon={faGithub} size={'2x'} style={{color:"var(--primaryBG)", marginRight:10 , fontWeight:600}}/></a>
                            <a className={style.btn_link} href={style.linkedin}><FontAwesomeIcon icon={faLinkedin} size={'2x'} style={{color:"var(--primaryBG)", marginRight:10 , fontWeight:600}}/></a>
                            <a className={style.btn_link} href={style.website}><FontAwesomeIcon icon={faGlobe} size={'2x'} style={{color:"var(--primaryBG)", marginRight:10 , fontWeight:600}}/></a>
                        </div>
                    </div>
                )
            })
        }
        </>
    );
}
  