import Link from 'next/link'
import { ucEachWord } from '../../modules/helpers/typography'

export default function StoryBar({collection}) {
    function getNavButtonTemplate(link, title, desc){
        return <Link href={`/${link}`}>
            <li className="nav-item" style={{listStyleType: "none"}}>
                <div className="nav-link">
                    <div className='row'>
                        <div className='col-3'>
                            {/* ... */}
                        </div>
                        <div className='col-9'>
                            <h5>{ucEachWord(title)}</h5>
                            <h6>{desc}</h6>
                        </div>
                    </div>
                </div>
            </li>
        </Link>
    }

    return (
        <div className="nav-new-holder">
            {
                collection.map((val, i, index) => {
                    if(val.section != null || i == 0){
                        return getNavButtonTemplate(val.link, val.title, val.desc)
                    } else {
                        return <>
                            <hr className='navbar-divider-line'></hr>
                            { getNavButtonTemplate(val.link, val.title, val.desc) }
                        </>
                    }
                })
            }
        </div>
    )
}