import cls from "./AddInput.module.scss"
import { Select } from "antd";
import { useRef, useState } from "react";
import { KeyIcon, ReflashIcons } from "../../icons";
export default function AddInput({
    onChange,
    className,
    label,
    placeholder,
    Specialisation = [],
    register,
    passwordGenerate,
    loginGenerate,
    geterat,
    type,
    onKeyDawn,
    alert,
    responsive,
    value,
    disabled,
    ...other
}) {

    function generateLoginId() {
        var length = 6,
            charset = "0123456789",
            retVal = "";
        for (var i = 0, n = charset.length; i < length; ++i) {
            retVal += charset.charAt(Math.floor(Math.random() * n));
        }
        return retVal;
    }
    return (
        <label className={`${cls.AddInput} ${type === "textarea" && cls.widthFull} ${responsive && cls.AddInput__responsice} ${className && className}`} {...other}>
            <p className={cls.AddInput__label}>{label}</p>
            {
                type === "textarea" ? <textarea  {...register} className={cls.AddInput__textArea} placeholder={placeholder}>
                </textarea> : type === "select" ? <Select
                    defaultValue={placeholder}
                    style={{ width: "100%", zIndex: "100" }}
                    value={value}
                    onChange={onChange}
                    disabled={disabled}
                    options={Specialisation?.map(sp => ({ value: sp.id, label: sp.name }))}
                /> : <div className={`${cls.AddInput__labelinut}`}>
                    < input autoComplete="none"
                        value={value}
                        onChange={onChange}
                        {...register}
                        onKeyDown={onKeyDawn}
                        className={`${cls.AddInput__input} ${alert && cls.AddInput__border} ${disabled && cls.AddInput__disabled}`}
                        type={type}
                        placeholder={placeholder}
                        disabled={disabled}

                    />
                    {geterat &&
                        <div onClick={() => {
                            loginGenerate(generateLoginId())
                        }}
                            className={`${cls.AddInputRoundno}`}
                        >
                            <ReflashIcons />
                        </div>}
                </div>
            }
            {alert && <p className={cls.AddInput__alert}>{alert}!</p>}
        </label>
    )
}
