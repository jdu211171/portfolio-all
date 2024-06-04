'use client'
import { useEffect, useState } from "react"

import cls from "./LessonTable.module.scss"

export default function LessonTable({ children, lassons = [], lessonId, setLessonId, semestorId,allcridet, setsemestorId, onClick, ...other }) {


    const arr = lassons?.find(e => e.id == lessonId)
    return (
        <>
            <h3 className={cls.LessonTable__title}>
                レッスン</h3>
            <div className={cls.LessonTable__list}>
                {lassons && lassons.map(e => (
                    <p
                        key={e?.id}
                        className={`${cls.LessonTable__list__text} ${e?.id === lessonId ? cls.LessonTable__lisActive : ""}`}
                        onClick={() => setLessonId(e?.id)}>
                        {e?.name}
                    </p>
                ))}
            </div>
            <div className={cls.LessonTable__table} >
                <div className={cls.LessonTable__table__semester}>
                    <div className={cls.LessonTable__table__semester__div} >
                        <p className={cls.LessonTable__table__text}>セメスター:</p>
                        {arr?.semesters?.map(e => (
                            <button
                                key={e}
                                className={`${cls.LessonTable__table__btn} ${semestorId == e?.id ? cls.LessonTable__table__btnActive : ""}`}
                                onClick={() => setsemestorId(e?.id)}>
                                {e?.semesterNumber}
                            </button>
                        ))}
                    </div>
                    <div className={cls.LessonTable__table__semester__div} >
                        <p className={cls.LessonTable__table__text}>全体:</p>
                        <p className={cls.LessonTable__table__all}>{ allcridet}</p>
                    </div>
                </div>
                {children}

            </div>
        </>
    )
}
