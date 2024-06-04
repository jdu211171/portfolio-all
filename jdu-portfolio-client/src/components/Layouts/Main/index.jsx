import React, { useEffect, useState } from 'react'
import { Outlet, useLocation, useNavigate } from 'react-router-dom'
import { GetMe } from '../../../services/me'
import Header from '../../UL/header'
import SideBar from '../../UL/sidebar'
import cls from "./Main.module.scss"

export default function MainLayout({ user }) {

    if (user) {
        return (
            <div>
                <Header user={user} />
                <div className={cls.MainLayout__content}>
                    <SideBar user={user} />
                    <Outlet />
                </div>
            </div>
        )
    } else {
        <>
        </>
    }
}
