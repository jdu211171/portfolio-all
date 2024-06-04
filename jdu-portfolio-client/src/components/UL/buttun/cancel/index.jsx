import cls from "./concel.module.scss"

export default function CancelBtn({ onClick, children }) {
    return (
        <div className={cls.CancelBtn} onClick={onClick}>
            {children}
        </div>
    )
}
