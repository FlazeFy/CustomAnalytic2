import controls from './controls.module.css'

export default function GetLimit({ctx}) {
    function navigate(ctx, ord){
        sessionStorage.setItem(`Table_limit_${ctx}`, ord);
        location.reload();
    }

    const collection = [
        {
            context: "15 Item/Page",
            value: 15
        },
        {
            context: "25 Item/Page",
            value: 25
        },
        {
            context: "50 Item/Page",
            value: 50
        },
        {
            context: "100 Item/Page",
            value: 100
        },
    ]

    return (
        <div className="dropdown">
            <a className="btn btn-secondary dropdown-toggle" href="#" role="button" id="dropdownMenuLink" data-bs-toggle="dropdown" aria-expanded="false">
                { sessionStorage.getItem(`Table_limit_${ctx}`) + " Item/Page" }
            </a>
            <ul className="dropdown-menu" aria-labelledby="dropdownMenuLink">       
            {
                collection.map((item, i, idx) => {
                    return (
                        <li><button className="dropdown-item" onClick={(e) => navigate(ctx, item['value'])}>{ item['context'] }</button></li>
                    )
                })
            }
            </ul>
        </div>
    )
}