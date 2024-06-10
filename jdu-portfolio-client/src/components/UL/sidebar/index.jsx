import React, { useEffect, useRef, useState } from 'react'

import cls from "./sidebar.module.scss"
import { navLinks, recruitorLink, decanLink, settingLinks, studentLink, teacherLink } from './data'
import { LogOutIcon } from '../icons'
import CancelBtn from '../buttun/cancel'
import BlueButtun from '../buttun/blueBtn'


import { Link, useLocation, useNavigate, useSearchParams } from 'react-router-dom'
import { Loginout } from '../../../services/auth'
import paramsToObject from '../../../utils/paramsToObject'


export default function SideBar({ user }) {
    const [params, setSearchParams] = useSearchParams()
    const pashName = useLocation()
    const router = useNavigate()

    const x = useRef()
    const y = useRef()
    const [links, setLink] = useState()

    useEffect(() => {
        if (user?.role == "recruitor") {
            setLink(recruitorLink)
        }
        if (user?.role === "decan") {
            setLink(decanLink)
        }
        if (user?.role === "student") {
            setLink(studentLink)
        }
        if (user?.role === "teacher" || user?.role === "staff") {
            setLink(teacherLink)
        }


    }, [user?.role]);

    return (
        <>
            <div
                className={`${cls.SideBar__shodow} ${params.get("sideBar") == "true" ? cls.SideBarClose : ""}`}
                onClick={() => { setSearchParams({ ...paramsToObject(params.entries()), sideBar: false }) }}
            ></div>
            <div className={`${cls.SideBar} ${params.get("sideBar") == "true" ? cls.SideBarClose : ""}`}>
                <div className={cls.SideBar__hello}>
                    <p className={cls.SideBar__text}>全体的 </p>
                    {navLinks?.map(e => {

                        if (links?.includes(e.label)) {

                            return (
                                <React.Fragment key={e?.id}>
                                    <Link
                                        className={`${cls.SideBarBtn} ${pashName.pathname.includes(`/${user?.role}` + e?.link) ? cls.SideBar__active : ""}`}
                                        to={`/${user?.role}${e?.link}`}
                                    >
                                        {e?.icon(`${pashName.pathname.includes(`/${user?.role}` + e?.link) ? "#FFFFFF" : "black"}`)}
                                        {e?.label}
                                    </Link>
                                </React.Fragment>
                            )

                        }
                    })}
                    <p className={cls.SideBar__text} style={{ marginTop: "50px" }}>プリファレンス </p>
                    {settingLinks?.map(e => (
                        <Link
                            className={`${cls.SideBarBtn} ${pashName.pathname.includes(e?.link) ? cls.SideBar__active : ""}`}
                            key={e?.id}
                            to={e.link}
                        >
                            {e?.icon(`${pashName.pathname.includes(e?.link) ? "white" : "black"}`)}
                            {e?.label}
                        </Link>
                    ))}
                </div>

                <button className={cls.SideBar__logout} onClick={() => x.current.classList.add("displayBlock")}><LogOutIcon /> ログアウト</button>
                <div className={cls.SideBar__logout2__wrap} ref={x} onClick={(e) => {
                    if (e.target == x.current) {
                        x.current.classList.remove("displayBlock")
                    }

                }}>
                    <div className={cls.SideBar__logout2} ref={y}>
                        <p className={cls.SideBar__logout2__text}>
                            ログアウトしますか?
                        </p>
                        <div>
                            <CancelBtn onClick={async () => {
                                await Loginout()
                                router('/auth/login')
                            }}>
                                はい
                            </CancelBtn>
                            <BlueButtun onClick={() => x.current.classList.remove("displayBlock")}   >いいえ</BlueButtun>
                        </div>
                    </div>
                </div>
            </div >
        </>
    )
}
