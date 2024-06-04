
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
    const [lessonId, setLessonId] = useState()
    const [semestorId, setsemestorId] = useState()
    const [lassonsArr, setLessonArr] = useState([])
    const [openImg, setOpneImg] = useState(false)
    useEffect(() => {
        if (!lessonId) {
            setLessonId(user.lessons?.[0]?.id)
        }
    }, [user.lessons])

    useEffect(() => {
        const arr = user.lessons?.find(e => e.id == lessonId)
        setLessonArr(arr?.semesters)
        setsemestorId(arr?.semesters?.[0]?.id)

    }, [lessonId])

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
                        {
                            role !== "parent" && user?.Parents?.[0]?.isActive ? user?.Parents?.length ? <div className={cls.OneStudent__person}>
                                <div className={cls.OneStudent__person__box} onClick={() => router(`/decan/parents/${user?.Parents?.[0]?.id}`)}>
                                    {user?.Parents?.[0]?.avatar ? <img
                                        src={user?.Parents?.[0]?.avatar}
                                        width={64}
                                        height={65}
                                        alt={"img"}
                                        style={{ borderRadius: "50%", objectFit: "cover" }}
                                    /> :
                                        <Avatar name={`${user?.Parents?.[0]?.firstName} ${user?.Parents?.[0]?.lastName}`} size="64" round={64} />
                                    }

                                    <div className={cls.OneStudent__person__dv}>
                                        <p className={cls.OneStudent__person__text}>{user?.Parents?.[0].firstName} {user?.Parents?.[0].lastName}</p>
                                        <p className={cls.OneStudent__person__id}>ID:{user?.Parents?.[0].loginId}</p>
                                    </div>

                                </div>
                                <a href={`mailto:${user?.Parents?.[0].email}`} > <EmailIcons2 />

                                    <p>   {user?.Parents?.[0].email}</p>

                                </a>
                                <a href="#"> <TelIcons2 /> {user?.Parents?.[0].phoneNumber}</a>
                            </div> : "" : ""
                        }

                    </div>
                </div>

                <div className={`${cls.OneStudent__content} ${role !== "parent" && user?.Parents?.[0]?.isActive && user?.Parents?.length ? cls.margin : ""}`} >
                    {
                        ["null", "undefined", null, undefined].includes(user?.bio) || user?.bio && user?.images && <h3 className={cls.OneStudent__title}>自己紹介</h3>
                    }
                    {
                        ["null", "undefined", null, undefined].includes(user?.bio) || user?.bio && <div className={cls.OneStudent__text__wrap}>
                            {
                                user.bio?.split('\n')?.map(e => (

                                    <p className={cls.OneStudent__text}>  {e}</p>
                                ))
                            }
                        </div>
                    }
                    {

                        <>
                            {user?.images?.length ?
                                <>
                                    <p className={cls.OneStudent__title}>ギャラリー</p>
                                    <div className={cls.OneStudent__imgs}>
                                        <div >
                                            {
                                                user?.images?.map((e, i) => (
                                                    <img
                                                        key={i}
                                                        src={e}
                                                        width={223}
                                                        height={160}
                                                        onClick={() => setOpneImg(e)
                                                        }
                                                        alt='img'
                                                    />
                                                ))
                                            }
                                        </div>
                                        {["null", "undefined", null, undefined].includes(user?.desc) || user?.desc && <>


                                            {
                                                user?.desc?.split('\n')?.map(e => (
                                                    <p className={cls.OneStudent__text}>  {e}</p>
                                                ))
                                            }
                                        </>
                                        }
                                    </div>
                                </> : <NoGaler />
                            }
                        </>}
                    {
                        openImg && <div className={cls.OneStudent__imgOpen} onClick={() => setOpneImg(false)}>
                            <img

                                src={openImg}
                                width={500}
                                height={500}
                                alt={"img"}
                            />
                        </div>
                    }

                    {
                        user?.jlpt || user?.jud ? <h3 className={cls.OneStudent__title}>Japan Language tests</h3> : ""
                    }

                    <div className={cls.OneStudent__Test__wrap}>
                        {
                            user?.jlpt ? <div className={cls.OneStudent__Test}>
                                <p className={cls.OneStudent__Test__text}>JLPT</p>
                                <div className={cls.OneStudent__Test__box}>{user?.jlpt ? user?.jlpt : "N"}</div>
                                <p className={cls.OneStudent__Test__p}>Japanese Language Proficiency Test</p>
                            </div> : <div></div>
                        }
                        {
                            user?.jdu ? <div className={cls.OneStudent__Test}>
                                <p className={cls.OneStudent__Test__text}>JDU</p>
                                <div className={cls.OneStudent__Test__box}>{user?.jdu ? user?.jdu : "Q"}</div>
                                <p className={cls.OneStudent__Test__p}>Japan Digital University</p>
                            </div> : <div></div>
                        }
                    </div>
                </div>

            </Container >

        </div >
    )
}
