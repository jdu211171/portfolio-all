import React from 'react'

import cls from "./TopList.module.scss"

export default function TopList({ text }) {
    return (
        <ul className={cls.TopList}>
            {text && text?.map((e, i) => (
                e && <li key={i} className={`${cls.TopList__item}  ${e?.length == 0 ? cls.TopList__item__item : ""}`}>{e}</li>
            ))}
        </ul>
    )
}

