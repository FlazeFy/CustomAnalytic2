//Font awesome classicon
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUpRightFromSquare } from "@fortawesome/free-solid-svg-icons"
import AtomsText from "../../../../atoms/atoms_text"
import AtomsBreakLine from '../../../../atoms/atoms_breakline'

export default function GetReference({props}) {
    return (
        <div>
            <AtomsText body="Reference" text_type="sub_heading"/>
            {
                props ?
                    props.map((val, idx) => {
                        return (
                            <li key={idx} className='reference-item'>{val.reference_name} <a href={val.reference_url} title="Open source"><FontAwesomeIcon icon={faUpRightFromSquare}/></a></li>
                        )
                    })
                :
                    <></>
            }
            <AtomsBreakLine length="1"/>
            <hr className="section-line"></hr>
            <AtomsBreakLine length="1"/>
        </div>
    )
}