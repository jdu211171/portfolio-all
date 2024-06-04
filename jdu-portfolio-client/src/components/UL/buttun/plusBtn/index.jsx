import cls from "./plus.module.scss"
import { forwardRef } from "react"


const PlusBtn = forwardRef(({ lenght, label, onClick }, ref) => {
    return (
        <button className={cls.PlusBtn} ref={ref} onClick={onClick}>
            {label}  {lenght > 0 ? lenght : ""}
        </button>
    )
})

export default PlusBtn