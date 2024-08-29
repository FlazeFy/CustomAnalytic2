//Font awesome classicon
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUpRightFromSquare } from "@fortawesome/free-solid-svg-icons"
import AtomsText from "../../../../atoms/atoms_text"

export default function GetReference({props}) {
    return (
        <div>
            <AtomsText body="Reference" text_type="sub_heading"/>
            {
                props.map((val, i, index) => {
                    return (
                        <li className='reference-item'>{val.reference_name} <a href={val.reference_url} title="Open source"><FontAwesomeIcon icon={faUpRightFromSquare}/></a></li>
                    )
                })
            }
            <br></br><hr className="section-line"></hr><br></br>
        </div>
    )
}