
import PlusBtn from '../../buttun/plusBtn'
import SkillBtn from '../../buttun/skill'
import DoteBtn from '../../buttun/doteBtn'

import React, { useRef, useState } from 'react'
import { SelectIcon } from '../../icons'
import cls from "./StudentList.module.scss"
import { useNavigate, useSearchParams } from 'react-router-dom'
import Avatar from 'react-avatar'
import { StudentSelect, StudentSelectDel } from '../../../../services/recruter'
import ListModal from '../../madals/listMadal'
import { useQueryClient } from 'react-query'
import IdBtn from '../../buttun/idBtn'
import { useGetWindowWidth } from '../../../../hooks/useGetWindowWith'

export default function StudentList({ isSelcted, avatar, name, gruop, id, loginId, select, jdu, jlpt }) {
    const widthwindow = useGetWindowWidth()
    const queryClient = useQueryClient()
    const [params] = useSearchParams()
    const router = useNavigate()
    const [useId, setIseId] = useState()
    const [clickTrue, setClick] = useState(false)
    const [color, setColor] = useState(isSelcted)
    const [number, setNumber] = useState(0)
    const x = useRef()
    const o = useRef()
    const u = useRef()
    return (
        <div style={{ position: 'relative' }}>
            <li className={cls.StudentList}>
                <div className={cls.StudentList__personWrap}>
                    <div className={cls.StudentList__select} onClick={async (e) => {

                        if (color) {
                            StudentSelectDel(id)
                            queryClient.invalidateQueries(['student', params.get('group'), params.get('groups'), params.get('rate'), params.get('year'), params.get('search')])
                        } else {
                            StudentSelect(id)
                            queryClient.invalidateQueries(['student', params.get('group'), params.get('groups'), params.get('rate'), params.get('year'), params.get('search')])
                        }
                        setColor(!color)
                    }}>
                        <SelectIcon fill={`${color ? "#F7C02F" : "none"}`} border={"#F7C02F"} />
                    </div>
                    <div className={cls.StudentList__pirson} onClick={() => router(`/recruitor/students/${id}`)}>
                        {avatar ? <img
                            src={avatar}
                            width={48}
                            height={48}
                            alt="img"
                        /> : <Avatar name={name} size="48" round={true} />}
                        <div className={cls.StudentList__pirson__div}>
                            <p className={cls.StudentList__pirson__name}>{name}</p>
                            {widthwindow < 1040 ? <p className={cls.StudentList__pirson__Id}>ID:{loginId}</p> : ""}
                        </div>
                    </div>
                </div>
                {widthwindow > 1040 ? <div className={cls.StudentList__id}>
                    <IdBtn>ID:{loginId}</IdBtn>
                </div> : ""}
                {gruop && <div className={cls.StudentList__gruop}>
                    {gruop}
                </div>}
                {jdu && <div className={cls.StudentList__jdu}>
                    {jdu}
                </div>}
                {jlpt && <div className={cls.StudentList_jlpt}>
                    {jlpt}
                </div>}
                {<div className={cls.StudentList__action}>
                    <DoteBtn onClick={(e) => setIseId(true)} />
                </div>}


                <hr className={cls.StudentList__line} />

            </li>
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
            <ListModal
                role={"student"}
                lebel={color ? "取り消す" : " 気になる"}
                select={(e) => {
                    if (color) {
                        StudentSelectDel(id)
                    } else {
                        StudentSelect(id)
                    }
                    setColor(!color)
                    setIseId(false)
                }}
                style={useId ? { display: "block" } : { display: "none" }}
            />
        </div>


    )
}
