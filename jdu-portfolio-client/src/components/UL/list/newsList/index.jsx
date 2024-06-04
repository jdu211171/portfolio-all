import React, { useRef } from 'react'
import { useQueryClient } from 'react-query'
import { useSearchParams, useNavigate } from 'react-router-dom';
import { NewstDelelet } from '../../../../services/news';
import { ClockIcon, DeleteNewIcon, EdetNewIcon } from '../../icons'

import cls from "./newsList.module.scss"

export default function NewsList({ id, img, category, role, text, createAt, onClick }) {
    let date = new Date(createAt);
    let Hours = date.getHours();
    let Minutes = date.getMinutes();
    const weeksDay = ["日曜日", "月曜日", "火曜日", "水曜日", "木曜日", "金曜日", "土曜日"]

    const queryClient = useQueryClient()
    const [params] = useSearchParams()
    const router = useNavigate()

    return (
        <div className={cls.NewsList} >
            <div className={cls.NewsList__img} onClick={onClick}>
                <img
                    src={img}
                    width={324}
                    height={196}
                    alt="img"
                />
            </div>
            <div className={cls.NewsList__content} >
                <div onClick={onClick}>
                    <div className={cls.NewsList__top}>
                        <p className={cls.NewsList__category} style={{ border: "1px solid #932F46", color: "#932F46" }}>{category}</p>
                        <p className={cls.NewsList__date}><ClockIcon />{Hours}:{Minutes} {weeksDay[date.getDay()]}</p>
                    </div>
                    <p className={cls.NewsList__text}>{text}</p>
                </div>

                {role == "decan" ? <div className={cls.NewsList__decan}>
                    <button className={cls.NewsList__edit} onClick={() => {
                        router(`/newsAdd?id=${id}`)
                        localStorage.clear("object")
                    }}><EdetNewIcon /></button>
                    <button className={cls.NewsList__delete}
                        onClick={() => {
                            NewstDelelet(id)
                            queryClient.invalidateQueries(['news', params.get('categoryId'), params.get('search')],)
                        }}><DeleteNewIcon /></button>
                </div> : ""}
            </div>
        </div>
    )
}
