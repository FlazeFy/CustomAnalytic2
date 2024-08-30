//Font awesome classicon
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faIcons, faWarning } from "@fortawesome/free-solid-svg-icons"
import { getCleanTitleFromCtx } from '../modules/helpers/converter'
import { ucFirst } from '../modules/helpers/typography'
import AtomsText from '../atoms/atoms_text'

export default function MoleculesAlertBox(props) {
    return (
        <div>
            {
                props.type == 'error' && <AtomsText body={getCleanTitleFromCtx(props.context)} text_type="sub_heading"/>
            }
            <div className={`alert alert-${props.type}`} role='alert'>
                <h4><FontAwesomeIcon icon={props.type == 'warning' || props.type == 'danger' ? faWarning : faIcons}/> {ucFirst(props.type == 'danger' ? 'error':props.type)}</h4>
                {props.message}
            </div>
        </div>
    )
}