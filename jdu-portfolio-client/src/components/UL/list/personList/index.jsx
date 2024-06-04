import DoteBtn from '../../buttun/doteBtn'
import IdBtn from '../../buttun/idBtn'

import PlusBtn from '../../buttun/plusBtn'
import SkillBtn from '../../buttun/skill'
import ListModal from '../../madals/listMadal'
import React from 'react'
import { useRef, useState } from 'react'
import Avatar from 'react-avatar';
import cls from "./personlist.module.scss";
import { Link } from '@react-email/link'
import { useGetWindowWidth } from '../../../../hooks/useGetWindowWith'


export default function PersonList({ id, img, name, gruop, action, student, role, moveTo, rate, phone, skill, email, remove, update, onClick }) {
    const [useId, setIseId] = useState()
    const [clickTrue, setClick] = useState(false)
    const x = useRef()
    const y = useRef()
    const o = useRef()
    const u = useRef()
    const em = useRef()
    const [number, setNumber] = useState(0)
    const widthwindow = useGetWindowWidth()
    return (
        <div style={{ position: 'relative' }}>
            <div className={cls.PersonList} onClick={(e) => {
                if (e.target != y.current && e.target != o.current && e.target != u.current && e.target != em.current) {
                    onClick(e)
                }
            }} >
                <div className={cls.PersonList__fillname} >
                    {img ? <img
                        src={img}
                        width={48}
                        height={48}
                        alt={img}
                    /> : <Avatar name={name} size="48" round={true} />
                    }
                    <div>
                        <p className={cls.PersonList__name}>{name}</p>
                        {widthwindow < 600 ? <p className={cls.PersonList__idreponsice}>ID:{id}</p> : ""}
                    </div>
                </div>
                {widthwindow > 600 ? <div className={cls.PersonList__id}>
                    <IdBtn>ID:{id}</IdBtn>
                </div> : ""}
                {gruop && <p className={cls.PersonList__Gruop}>{gruop}</p>}
                {rate && <div className={cls.PersonList__progres}>
                    {rate}
                </div>
                }
                {phone && <p className={cls.PersonList__phone}>{phone}</p>}
                {student && skill ? <div className={cls.PersonList__skill}>{skill}</div> : ""}
                {email && <a href={`mailto:${email}`} className={cls.PersonList__email} ref={em}>{email}</a>}
                {<div className={cls.PersonList__action}>
                    <DoteBtn ref={y} onClick={() => setIseId(true)} />
                </div>}
                <hr className={cls.PersonList__line} />
            </div>
            <div
                ref={x}
                onClick={e => {
                    if (e.target == x.current) {
                        setIseId(false)
                    }
                }}
                style={useId ? { display: "flex" } : { display: "none" }}
                className={cls.backround}
            ></div>
            {
                <ListModal
                    remove={() => {
                        setIseId(false)
                        remove()
                    }
                    }
                    role={role}
                    update={() => {
                        setIseId(false)
                        update()
                    }}

                    moveTo={moveTo ? () => {
                        setIseId(false)
                        moveTo()
                    } : false}
                    onClick={onClick}
                    style={useId ? { display: "block" } : { display: "none" }}
                />
            }
        </div>
    )
}
