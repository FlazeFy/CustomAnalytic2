//Font awesome classicon
import { library } from "@fortawesome/fontawesome-svg-core"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUpRightFromSquare } from "@fortawesome/free-solid-svg-icons"

export default function GetReference({props}) {
    return (
        <div>
            <h4 className='section-title'>Reference</h4>
            {
                props.map((val, i, index) => {
                    return (
                        <li className='reference-item'>{val.name} <a href={val.url} title="Open source"><FontAwesomeIcon icon={faUpRightFromSquare}/></a></li>
                    )
                })
            }
            <br></br><hr className="section-line"></hr><br></br>
        </div>
    )
}