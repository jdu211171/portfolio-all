import React from 'react'
import cls from "./noGalllery.module.scss"

export default function NoGaler() {
    return (
        <div className={cls.NoGaler}>
            <img src="/Image/2phote.png" alt="img" />
            <div className={cls.NoGaler__wrap}>
                <h3 className={cls.NoGaler__title}>ギャラリー</h3>
                <p className={cls.NoGaler__text}>この学生に関する詳しいデータや写真は、ビデオ ギャラリーをアップロード時に見つけることができます.</p>
            </div>
        </div>
    )
}
