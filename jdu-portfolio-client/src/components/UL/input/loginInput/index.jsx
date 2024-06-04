import cls from "./inputLogin.module.scss"

export default function LoginInput({ onChange, register = {}, alert, eyeOpen, setError, eyeClick, icon, icon2, type, placeholder, ...other }) {
    return (
        <div className={cls.LoginInput__label}>
            <input
                autocomplete="off"
                className={`${cls.LoginInput} ${alert && cls.LoginInput__border}`}
                type={type}
                placeholder={placeholder}
                {...register}
                {...setError}
                {...other}
            />
            {alert && <p>{alert}</p>}
            {
                icon && <div className={cls.LoginInput__eye} onClick={eyeClick}> {eyeOpen ? icon : icon2}</div>
            }
        </div>
    )
}
