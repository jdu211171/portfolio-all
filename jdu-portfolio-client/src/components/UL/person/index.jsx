import React, { useState } from 'react'
import Avatar from 'react-avatar'
import { useQueryClient } from 'react-query'
import { Link, useParams, useSearchParams } from 'react-router-dom'
import { useGetWindowWidth } from '../../../hooks/useGetWindowWith'
import { StudentSelect, StudentSelectDel } from '../../../services/recruter'
import { EmailNewIcon, SelectIcon } from '../icons'
import cls from "./person.module.scss"

export default function Person({ avatar, role, position, section, name, id, year, email, Professor, rate }) {
    const [open, setOpen] = useState(false)
    const [color, setColor] = useState(false)
    const widthWindow = useGetWindowWidth()
    const queryClient = useQueryClient()
    const [params] = useSearchParams()
    const { id: userId } = useParams()

    return (
        <div className={cls.Person}>
            {
                role == 'gruop' ? <div className={cls.Person__gruop}>{name}
                </div> : avatar ? <img
                    onClick={() => setOpen(true)}
                    src={avatar}
                    width={widthWindow > 600 ? 130 : 100}
                    height={widthWindow > 600 ? 130 : 100}
                    alt={"img"}
                /> : <Avatar name={name} size={widthWindow > 600 ? 130 : 100} round={true} />

            }

            {open && <div className={cls.Person__imgOpen} onClick={() => setOpen(false)}>
                <img
                    src={avatar}
                    width={500}
                    height={500}
                    alt={"img"}
                />
            </div>
            }
            <div className={cls.Person__contect}>
                <div>
                    <p className={cls.Person__name}>{name}</p>
                    {year || Professor ? <div className={cls.Person__div}>
                        <p className={cls.Person__id}>ID:{id}</p>

                        {year ? <p className={cls.Person__year}> {year}</p> : ""}
                        {Professor ? <p className={cls.Person__year}> {Professor}</p> : ""}
                    </div> : ""}
                    {role == "recruitor" && <div className={cls.Person__select} onClick={async (e) => {

                        if (color) {
                            StudentSelectDel(userId)
                            queryClient.invalidateQueries(['student', params.get('group'), params.get('groups'), params.get('rate'), params.get('year'), params.get('search')])
                        } else {
                            StudentSelect(userId)
                            queryClient.invalidateQueries(['student', params.get('group'), params.get('groups'), params.get('rate'), params.get('year'), params.get('search')])
                        }
                        setColor(!color)
                    }}
                    > <SelectIcon fill={`${color ? "#F7C02F" : "none"}`} border={"#F7C02F"} /></div>}
                    {position || section ? <div className={cls.Person__div}>
                        {position ? <p className={cls.Person__year}> {position}</p> : ""}
                        {section ? <p className={cls.Person__year}> {section}</p> : ""}
                    </div> : ""}
                    {rate && <div className={cls.Person__rate}><SelectIcon fill={"black"} border={"black"} /> <p>{rate}</p></div>}
                </div>
                {email && <a href={`mailto:${email}`} className={cls.Person__email}><EmailNewIcon /> {email}</a>}
            </div>
        </div>
    )
}
