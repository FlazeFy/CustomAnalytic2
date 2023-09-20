import GetDiscussionContainer from '../../../../components/containers/discussion_container'

export default function GetDiscussion({props}) {
    return (
        <div>
            <h4 className='section-title'>Discussion</h4>
            {
                props.map((val, i, index) => {
                    return (
                        <GetDiscussionContainer props={val}/>
                    )
                })
            }
        </div>
    )
}