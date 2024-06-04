import React from 'react'

import cls from "./TopList.module.scss"

export default function TopList2({ text }) {
    return (
        <ul className={cls.TopList}>
            {text && text?.map((e, i) => (
                <li key={i} className={cls.TopList__item}>{e}</li>
            ))}
        </ul>
    )
}

