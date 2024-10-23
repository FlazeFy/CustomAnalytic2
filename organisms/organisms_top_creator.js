import AtomsText from '../atoms/atoms_text'
import { ucEachWord } from '../modules/helpers/typography'
import MoleculesFeedbackRate from '../molecules/molecules_feedback_rate'
import style from './organisms.module.css'

export default function OrganismsTopCreator(props) {
    return (
        <div className={style.user_box}>
            <img className="img-profile mx-auto mb-3" src="/images/default/default_admin.png" alt="username-profile-pic.png"></img>
            <AtomsText body={props.username} text_type="mini_sub_heading"/>
            <a style={{color:'white', fontSize:'var(--textXSM)', fontStyle:'italic'}}>Joined Since {props.joined_at}</a>
            <hr className='section-line'></hr>
            <AtomsText body={'Average Rates : '+props.average_rate} text_type="main_content"/>
            <AtomsText body={'Total Stories : '+props.total_stories} text_type="main_content"/>
            <AtomsText body={'Most Posted Story : '+ucEachWord(props.most_type)} text_type="main_content"/>
        </div>
    )
}