

import React from 'react'
import Avatar from 'react-avatar'
import { RightIcon } from '../../icons'

import cls from "./TopStudent.module.scss"

export default function TopStudentList({ name, avatar, progress, onClick }) {
    return (
        <div className={cls.TopStudentList} onClick={onClick}>
            <div className={cls.TopStudentList__img}>

                {
                    avatar ? <img
                        src={avatar}
                        alt="img"
                        width={44}
                        height={44}
                        objectFit="cover"

                    /> : <Avatar name={name} size="44" round={true} />
                }
            </div>
            <div className={cls.TopStudentList__right}>
                <div className={cls.TopStudentList__top}>
                    <p className={cls.TopStudentList__name}>{name}</p>
                    <RightIcon />
                </div>
                <div className={cls.TopStudentList__btm}>
                    ID:{progress}
                </div>
            </div>
        </div>
    )
}
