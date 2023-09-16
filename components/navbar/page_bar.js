import { isNumInRange } from "../../modules/helpers/math";
import navbar from "../navbar/navbar.module.css"

export default function PageBar({curr, max, ctx}) {
    function navigate(idx, ctx){
        sessionStorage.setItem(`Table_${ctx}`, idx);
        location.reload();
    }

    return (
        <>       
            <h5 className="text-white">Page</h5>
            {
                Array.from({ length: max }).map((_, index) => (
                    curr !== index && index != 0 && isNumInRange(curr, index, 20) ?
                        <button className={navbar.page_bar} onClick={(e) => navigate(index, ctx)}>{ index }</button>
                    : curr === index && index != 0 && isNumInRange(curr, index, 20) ?
                        <button className={navbar.page_bar_active} onClick={(e) => navigate(index, ctx)}>{ index }</button>
                    :
                    <></>
                ))
            }
        </>
    )
}