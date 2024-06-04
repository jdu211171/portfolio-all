import cls from "./Idbtn.module.scss"

export default function IdBtn({ children, className, onClick }) {
    return (
        <button className={`${cls.idbtn} ${className && className}`} onClick={onClick}>
            <div></div>
            {children}
        </button>
    )
}
