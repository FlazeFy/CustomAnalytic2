import Head from 'next/head'
import { useRouter } from 'next/router'
import StoryBar from '../../components/navbar/story_bar'
import GetInfo from './usecases/detail/getInfo'
import GetReference from './usecases/detail/getReference'
import GetFeedback from './usecases/detail/getFeedback'
import GetDiscussion from './usecases/detail/getDiscussion'
import GetStats from './usecases/detail/getStats'
import PostDiscussion from './usecases/detail/postDiscussion'
import Swal from 'sweetalert2'
import { useEffect, useState } from 'react'
import AtomsText from '../../atoms/atoms_text'

export default function StoryDetail() {
    const router = useRouter()
    //Initial variable
    const [error, setError] = useState(null)
    const [isLoaded, setIsLoaded] = useState(false)
    const [items, setItems] = useState(null)

    useEffect(() => {
        if (!router.query.slug) return

        Swal.showLoading()
        fetch(`http://127.0.0.1:8000/api/stories/detail/${router.query.slug}`)
        .then(res => res.json())
            .then(
            (result) => {
                Swal.close()
                setIsLoaded(true)
                setItems(result.data)  
            },
            (error) => {
                Swal.close()
                Swal.fire({
                    icon: "error",
                    title: "Oops...",
                    text: "Something went wrong!",
                })
                setError(error)
            }
        )
    },[router.query.slug])

    const collection = [
        {
            link: "story",
            title: "Back",
            desc: "to story page",
            section: null
        },
        {
            link: null,
            title: "Info",
            desc: "Lorem ipsum",
            section: "info"
        },
        {
            link: null,
            title: "Detail",
            desc: "Lorem ipsum",
            section: "detail"
        },
        {
            link: null,
            title: "Stats",
            desc: "Lorem ipsum",
            section: "stats"
        },
        {
            link: null,
            title: "Discussion",
            desc: "Lorem ipsum",
            section: "discussion"
        },
        {
            link: null,
            title: "Feedback",
            desc: "Lorem ipsum",
            section: "manage"
        },
        {
            link: null,
            title: "Reference",
            desc: "wikipedia, ...",
            section: "reference"
        },
        {
            link: null,
            title: "Simmiliar Stories",
            desc: "...",
            section: "others"
        }
    ]

    const dummy = {
        detail: [
            {
                type: "section",
                title: "Lorem ipsum",
                body: "Lorem ipsum dolor sit almet"
            },
            {
                type: "section",
                title: "Lorem ipsum2",
                body: "Lorem ipsum dolor sit almet"
            }
        ], 
        feedback: [
            {
                rate: 5,
                username: "FlazeFy",
                profile_img: null,
                body: "One of the most iconic battle in whole war",
                created_at: "20-08-2020"
            },
            {
                rate: 4,
                username: "Flazen",
                profile_img: null,
                body: "Great content",
                created_at: "22-08-2020"
            }
        ], 
        stats: [
            {
                name: "casualities",
                data: [
                    {
                        context: "allies",
                        total: 620000
                    },
                    {
                        context: "axis",
                        total: 440000
                    }
                ],
                recommended: [
                    "pie_chart"
                ]
            },
            {
                name: "casualities per country",
                data: [
                    {
                        context: "british empire",
                        total: 420000
                    },
                    {
                        context: "germany",
                        total: 440000
                    },
                    {
                        context: "france",
                        total: 200000
                    }
                ],
                recommended: [
                    "pie_chart"
                ]
            },
        ],
        discussion: [
            {
                role: "creator",
                username: "FlazeFy",
                profile_img: null,
                body: "Lorem ipsum",
                created_at: "20-08-2020",
                is_you: true
            },
            {
                role: "editor",
                username: "Flazen",
                profile_img: null,
                body: "Lorem ipsum",
                created_at: "22-08-2020",
                is_you: false
            },
            {
                role: "visitor",
                username: "Flazen",
                profile_img: null,
                body: "Lorem ipsum",
                created_at: "22-08-2020",
                is_you: false
            }
        ], 
    }

    if (error) {
        return (
            <div>
                <h2>{getCleanTitleFromCtx(ctx)}</h2> 
                <div className='alert alert-danger' role='alert'>
                    <h4><FontAwesomeIcon icon={faWarning}/> Error</h4>
                    {error.message}
                </div>
            </div>
        )
    } else if (!isLoaded) {
        return (
            <div>
                <h5 className='text-center text-white mt-2 fst-italic'>Loading...</h5>
            </div>
        )
    } else {
        return (
            <div style={{background:"#181818"}}>
                <Head>
                    <title>Story | {items.main_title}</title>
                    <meta name="description" content="Generated by create next app" />
                    <meta name="viewport" content="width=device-width, initial-scale=1" />
                    <link rel="icon" href="/favicon.ico" />
                </Head>
                <main className="main">
                    <div className="content">
                        <div className="row">
                            <div className="col-3">
                                <StoryBar collection={collection}/>
                            </div>
                            <div className="col-9">
                                <GetInfo data={items}/>
                                <AtomsText body={<span dangerouslySetInnerHTML={{ __html: items.story_detail }} />} text_type="mini_content"/>
                                {/* <GetStats props={dummy.stats}/> */}
                                <GetReference props={items.story_reference}/>
                                <GetDiscussion props={dummy.discussion}/>
                                <PostDiscussion/>
                                <GetFeedback props={dummy.feedback}/>
                            </div>
                        </div>
                    </div>
                </main>
            </div>
        )
    }
}