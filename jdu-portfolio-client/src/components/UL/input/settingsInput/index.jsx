import cls from "./settingsInput.module.scss"
import { Select } from "antd";
export default function SettingsInput({
    label,
    type,
    className,
    register,
    alert,
    placeholder,
    disabled,
    Specialisation = [],
    onChange,
    eyeClick,
    icon,
    value,
    icon2,
    eyeOpen,
    ...other
}) {
    return (
        <label className={`${cls.SettingsInput} ${className && className}`}  {...other}>
            <p className={cls.SettingsInput__label}>{label}</p>
            {
                type === "select" ?
                    <Select
                        defaultValue={placeholder}
                        style={{ width: "100%", }}
                        value={value}
                        onChange={onChange}
                        disabled={disabled}
                        options={Specialisation?.map(sp => ({ value: sp.id, label: sp.name }))}
                    /> :
                    <input disabled={disabled} value={value} className={`${cls.SettingsInput__input} ${alert && cls.SettingsInput__border} ${disabled && cls.SettingsInput__disabled}`} type={type} placeholder={placeholder} {...register} onChange={onChange} />
            }
            {icon && <div className={cls.SettingsInput__eye} onClick={eyeClick}> {eyeOpen ? icon : icon2}</div>}
            {alert ? <p className={cls.SettingsInput__alert}>{alert}</p> : ""}
        </label>
    )
}
