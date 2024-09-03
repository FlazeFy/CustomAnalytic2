import style from './molecules.module.css'

// Toast
import AtomsToast from "../atoms/atoms_toast"
import { toast } from 'react-toastify'

export default function MoleculesFilterOrdering({ctx}) {
    const navigate = (ctx, ord) => {
        sessionStorage.setItem(`Table_order_${ctx}`, ord)
        toast.success(<AtomsToast msg={ctx + " filtered"} />)
    }

    return (
        <>       
            {
                sessionStorage.getItem(`Table_order_${ctx}`) === "desc" ? 
                    <button className={style.control_box} onClick={(e) => navigate(ctx,"asc")}>Order By Descending</button>
                :
                    <button className={style.control_box} onClick={(e) => navigate(ctx,"desc")}>Order By Ascending</button>
            }
        </>
    )
}