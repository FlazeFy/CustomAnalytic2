import style from './molecules.module.css'

//Font awesome classicon
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPaperPlane, faPlus } from "@fortawesome/free-solid-svg-icons"
import AtomsBreakLine from '../atoms/atoms_breakline'

export default function MoleculesChatBox(props) {
    return (
        <>
            <div className='position-relative'>
                <textarea className={style.msg_text_box} ref={props.messageRef} onInput={props.setMessage} placeholder={`Type your ${props.context}...`}></textarea>
                <button className={style.msg_text_send_btn} onClick={props.handleSubmit} title={`Send ${props.context}`}><FontAwesomeIcon icon={faPaperPlane}/> </button>
                {
                    props.is_with_attachment && (
                        <button className={style.msg_text_ext_btn} title={`Add ${props.context} attachment`}><FontAwesomeIcon icon={faPlus}/> </button>
                    )
                }
            </div>
            <AtomsBreakLine length="1"/>
            <hr className="section-line"></hr>
            <AtomsBreakLine length="1"/>
        </>
    )
}