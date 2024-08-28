export default function AtomsText(props){
    const defaultStyle = {
        sub_content: {
            fontSize:"var(--textLG)",
            ...props.text_style,
        },
        mini_content: {
            fontSize:"var(--textMD)",
            ...props.text_style,
        }
    }

    if(props.text_type == 'main_heading'){
        return <h2 className="mb-1 text-primary">{props.body}</h2>
    } else if(props.text_type == 'sub_heading'){
        return <h4 className="mb-1 text-primary">{props.body}</h4>
    } else if(props.text_type == 'mini_sub_heading'){
        return <h6 className="mb-1 text-white">{props.body}</h6>
    } else if(props.text_type == 'main_content'){
        return <p className="my-0 text-secondary" style={defaultStyle.sub_content}>{props.body}</p>
    } else if(props.text_type == 'mini_content'){
        return <p className="my-0 text-secondary" style={defaultStyle.mini_content}>{props.body}</p>
    }
}