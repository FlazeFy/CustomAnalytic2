export default function GetDetail({props}) {
    return (
        <div>
            {
                props.map((val, i, index) => {
                    if(val.type == "section"){
                        return (
                            <>
                                <h4 className='section-title'>{i+1}. {val.title}</h4>
                                <p>{val.body}</p>
                                <br></br>
                            </>
                        )
                    } else {
                        return <p>Error : Type is not valid</p>
                    }
                })
            }
            <br></br><hr className="section-line"></hr><br></br>
        </div>
    )
}