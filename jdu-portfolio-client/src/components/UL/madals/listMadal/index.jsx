import React from 'react'
import cls from "./ListModal.module.scss"

export default function ListModal({ update, moveTo, remove, role, select, lebel, onClick, className, ...other }) {

    return (
        <div className={`${cls.ListModal} ${className && className}`} {...other}>
            {
                role == "student" ? <button className={cls.ListModal__btn} onClick={select}> {lebel && lebel}</button> : role == "teacher" ? <>
                    <button className={cls.ListModal__btn} onClick={update}>成績を追加</button>
                </> : <>
                    <button className={cls.ListModal__btn} onClick={update}>編集</button>
                    {moveTo && <button className={cls.ListModal__btn} onClick={moveTo}> グループ変更</button>}
                    <button className={cls.ListModal__btn} onClick={remove}>削除</button>
                </>
            }
        </div>
    )
}
