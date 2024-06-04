import React from 'react'
import cls from "./loader.module.scss"
export default function Loader({ onClick }) {
    return (
        <div className={cls.Loader}>
            <div className={cls.Loader__wrap}>
                <div className={cls.Loader__top}>
                    <div>
                        <div class={cls.ldsring}><div></div><div></div><div></div><div></div></div>
                        <p>読み込み中...</p>
                    </div>
                </div>
                <button onClick={onClick} className={cls.Loader__btn}>キャンセル</button>
            </div>
        </div>
    )
}
