'use client'
import { useEffect, useState } from 'react'
import cls from "./RangeInput.module.scss"

export default function RangeInput({ lessonType, color, skill, defaultRange, disabled = false, onChange, ...other }) {
    const [rangeValue, setRangeValue] = useState(defaultRange)

    useEffect(() => (
        setRangeValue(defaultRange)
    ), [defaultRange])

    return (
        <div className={`${cls.RangeInput} ${color == "#E44D26" ? cls.RangeInput__skill__html :
            color == "#006BC0" ? cls.RangeInput__skill__css :
                color == "#E4A22A" ? cls.RangeInput__skill__JavaScript :
                    color == "#41B883" ? cls.RangeInput__skill__VueJs :
                        color == "#777BB3" ? cls.RangeInput__skill__PHP :
                            color == "#00D8FF" ? cls.RangeInput__skill__React :
                                color == "#9A4993" ? cls.RangeInput__skill__C :
                                    color == "#6FC4C5" ? cls.RangeInput__skill__asp :
                                        color == "#5382A1" ? cls.RangeInput__skill__SQL : ""
            } `}  {...other}>
            <p className={cls.RangeInput__text}>{lessonType}</p>
            <div className={cls.RangeInput__wrap}>
                <p className={cls.RangeInput__text}>{rangeValue}%</p>
                <input
                    type="range"
                    value={rangeValue}
                    disabled={disabled}

                    className={`${cls.RangeInput__input} ${disabled && cls.RangeInput__disabled} ${color == "black" ? cls.RangeInput__balck : ""} `}
                    style={{ background: color, WebkitSliderThumb: color }}
                    onChange={(e) => {
                        setRangeValue(e.target.value)
                        onChange(e.target.value)
                    }} />
            </div>
        </div>
    )
}
