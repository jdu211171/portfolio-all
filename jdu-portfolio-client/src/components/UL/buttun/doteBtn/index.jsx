import cls from "./doteBtn.module.scss"
import { forwardRef } from "react"
import { DoteIcon } from "../../icons"


const DoteBtn = forwardRef(({ onClick, ...other }, ref) => {
    return (
        <div className={cls.DoteBtn} ref={ref} onClick={onClick} {...other}>

        </div>
    )
})
export default DoteBtn