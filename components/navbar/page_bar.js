import navbar from "../navbar/navbar.module.css"

export default function PageBar({curr, max}) {
    return (
        <>
            {
                max.map((val, i, index) => {
                    return <div className={navbar.page_bar}>{i}</div>
                })
            }
        </>
    )
}