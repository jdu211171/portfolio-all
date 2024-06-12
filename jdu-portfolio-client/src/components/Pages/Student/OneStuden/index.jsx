
import BackBtn from '../../../UL/buttun/backBtn'
import Container from '../../../UL/container'
import Person from '../../../UL/person'
import RateTest from '../../../UL/RateTest'

import React, { useEffect, useState } from 'react'

import cls from "./OneStudent.module.scss"
import { useNavigate } from 'react-router-dom'
import BlueButtun from '../../../UL/buttun/blueBtn'
import NoGaler from '../../../UL/NoGallery'
import Avatar from 'react-avatar'
import { EmailIcons2, TelIcons2 } from '../../../UL/icons'


export default function OneStudent({ user, role }) {
    const router = useNavigate()


    const newDate = new Date()
    const [lassonsArr, setLessonArr] = useState([])
    const [openImg, setOpneImg] = useState(false)


    return (
        <div className={cls.OneStudent}>

            <Container  >
                <div className={cls.OneStudent__Wrap1}>
                    {role != 'student' ? <BackBtn onClick={(e) => router(-1)} role={true} UserId={user?.id} style={{ maxWidth: "100%" }} /> : ""}
                    {
                        role && role === "decan" ?
                            <BlueButtun
                                light={true}
                                className={cls.OneStudent__btn}
                                onClick={() => router(`/${role}/studentsSet/${user?.id}`)}

                            >
                                プロフィール編集
                            </BlueButtun> :
                            ""
                    }

                </div>

                <div className={cls.OneStudent__Wrap}>
                    <Person
                        id={user?.loginId}
                        name={`${user?.firstName} ${user?.lastName}`}
                        avatar={user?.avatar}
                        year={newDate.getFullYear() - user.brithday?.split('-')[0] + "歳"}
                        email={user?.email}
                        role={role}
                    />


                    <div style={{ width: "100%", }}>
                        {
                            role === "student" ?
                                <BlueButtun
                                    light={true}
                                    className={cls.OneStudent__btn}
                                    onClick={() => router(`/student/studentsSet/${user?.id}`)}

                                >
                                    プロファイル編集
                                </BlueButtun> : ""
                        }
                        

                    </div>
                </div>


            </Container >

        </div >
    )
}
