import Head from 'next/head'
import { useRouter } from 'next/router'
import StoryBar from '../../components/navbar/story_bar'
import GetDetail from './usecases/detail/getDetail'
import GetInfo from './usecases/detail/getInfo'
import GetReference from './usecases/detail/getReference'
import GetFeedback from './usecases/detail/getFeedback'
import GetDiscussion from './usecases/detail/getDiscussion'
import GetStats from './usecases/detail/getStats'
import PostDiscussion from './usecases/detail/postDiscussion'

export default function StoryDetail() {
    const router = useRouter()

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
        info: {
            main_title: "Battle of the somme",
            is_finished: true,
            type: "Battle",
            period_start: "01-07-1916",
            period_end: "18-11-1916",
            result: "Indecisive",
            location: "Somme River, north-central Somme and south-eastern Pas-de-Calais Départements, France",
            tag: [
                "France", "Germany", "British Empire", "Western Front"
            ],
            result_detail: [
                "Bulge driven into the Noyon salient"
            ],
        },
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
        reference: [
            {
                type: "website",
                name: "Battle of the somme",
                url: "wikipedia.com"
            },
            {
                type: "website",
                name: "Battle of the somme",
                url: "wikipedia.com"
            },
            {
                type: "book",
                name: "Battle of the somme",
                url: "wikipedia.com"
            },
            {
                type: "journal",
                name: "Battle of the somme",
                url: "wikipedia.com"
            }
        ], 
    }

    return (
        <div style={{background:"#181818"}}>
            <Head>
                <title>Story | {router.query.slug}</title>
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
                            <GetInfo props={dummy.info}/>
                            <GetDetail props={dummy.detail}/>
                            <GetStats props={dummy.stats}/>
                            <GetReference props={dummy.reference}/>
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