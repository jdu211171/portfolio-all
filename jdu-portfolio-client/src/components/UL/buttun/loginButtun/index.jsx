import cls from "./LoginButtun.module.scss"

export default function ButtunLogin({ children, type = 'button', onChange, ...other }) {
    return (
        <button type={type} className={cls.ButtunLogin} onClick={onChange} {...other}>
            {children}
        </button>
    )
}
