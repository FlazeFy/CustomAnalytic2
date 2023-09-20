import controls from './controls.module.css'

export default function GetOrdering({ctx}) {
    function navigate(ctx, ord){
        sessionStorage.setItem(`Table_order_${ctx}`, ord);
        location.reload();
    }

    return (
        <>       
            {
                sessionStorage.getItem(`Table_order_${ctx}`) === "desc" ? 
                    <button className={controls.control_box} onClick={(e) => navigate(ctx,"asc")}>Order By Descending</button>
                :
                    <button className={controls.control_box} onClick={(e) => navigate(ctx,"desc")}>Order By Ascending</button>
            }
        </>
    )
}