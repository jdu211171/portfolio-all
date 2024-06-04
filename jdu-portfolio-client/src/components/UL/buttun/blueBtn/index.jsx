import cls from "./BlueButtun.module.scss"

export default function BlueButtun({ children, type = "button", light, className, onClick, OnSubmit, ...other }) {
    return (
        <button
            className={`${cls.BlueButtun} ${light && cls.BlueButtun__light} ${className && className}`} type={type} onClick={onClick} onSubmit={OnSubmit} {...other} >
            {children}
        </button >
    )
}