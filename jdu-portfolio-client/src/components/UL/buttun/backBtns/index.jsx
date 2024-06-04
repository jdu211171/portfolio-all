

import { LeftIcon } from "../../icons"
import cls from "./backBtns.module.scss"

export default function BackBtn2({ onClick }) {
    return (
        <button className={cls.BackBtn2} onClick={onClick}>
            <LeftIcon />戻る
        </button>
    )
}
