import AtomsText from '../../../../atoms/atoms_text'
import GetDiscussionContainer from '../../../../components/containers/discussion_container'
import MoleculesChatBox from '../../../../molecules/molecules_chat_box'

export default function GetDiscussion({props}) {
    return (
        <div>
            <AtomsText body="Discussion" text_type="sub_heading"/>
            {
                props.map((val, i, index) => {
                    return (
                        <GetDiscussionContainer props={val}/>
                    )
                })
            }
            <MoleculesChatBox is_with_attachment={true} context="discussion"/>
        </div>
    )
}