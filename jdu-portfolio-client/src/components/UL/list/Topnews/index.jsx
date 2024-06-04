
import React from 'react'
import { ClockIcon, RightIcon } from '../../icons'
import cls from "./TopNews.module.scss"

export default function TopNewsList({ createAt, onClick, text }) {
    let date = new Date(createAt);
    let Hours = date.getHours();
    let Minutes = date.getMinutes();
    const weeksDay = ["日曜日", "月曜日", "火曜日", "水曜日", "木曜日", "金曜日", "土曜日"]
    return (
        <div className={cls.TopNewsList} onClick={onClick} >
            <div className={cls.TopNewsList__top}>
                <p className={cls.TopNewsList__top__text}><ClockIcon />{Hours}:{Minutes} {weeksDay[date.getDay()]}</p>
                <RightIcon />
            </div>
            <p className={cls.TopNewsList__text}>{text}</p>
        </div>
    )
}
