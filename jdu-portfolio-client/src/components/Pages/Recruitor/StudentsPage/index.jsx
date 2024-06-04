import React from 'react'
import { useGetWindowWidth } from '../../../../hooks/useGetWindowWith'
import Container from '../../../UL/container'
import Filter from '../../../UL/filter'
import StudentList from '../../../UL/list/studentList'
import TopStudents from '../../../UL/topStudents'

import cls from "./StudentsPage.module.scss"

const StudentsPage = React.forwardRef(({ data, data2, selected }, ref) => {
    const widthwindow = useGetWindowWidth()
    return (
        <>
            <Container style={{ paddingTop: `${widthwindow > 600 ? "100px" : "70px"}` }}>
                <Filter page={"student2"} />
                <div className={cls.StudentsPage__div}>
                    <ul className={cls.StudentsPage__top}>
                        <li className={cls.StudentsPage__top__item}>学生</li>
                        {widthwindow > 1040 ? <li className={cls.StudentsPage__top__item}>学生ID</li> : null}
                        {widthwindow > 600 ? <li className={cls.StudentsPage__top__item}>グループ</li> : null}
                        {widthwindow > 1200 ? <li className={cls.StudentsPage__top__item}>JLPT</li> : null}
                        {widthwindow > 1200 ? <li className={cls.StudentsPage__top__item}>JDU</li> : null}
                        <li className={cls.StudentsPage__top__item}>アクション</li>
                    </ul>

                    <ul>
                        {data?.length ? data?.map(e => {

                            if (selected) {
                                if (e.isSelected === true) {

                                    return (
                                        <StudentList
                                            key={e?.id}
                                            name={`${e?.firstName} ${e?.lastName}`}
                                            id={e?.id}
                                            loginId={e?.loginId}
                                            avatar={e?.avatar}
                                            gruop={e?.group?.name}
                                            jdu={widthwindow > 1200 ? e?.jdu || "-" : null}
                                            jlpt={widthwindow > 1200 ? e?.jlpt || "-" : null}
                                            isSelcted={e?.isSelected}
                                            student={true}
                                        />
                                    )
                                }
                            } else {
                                return (
                                    <StudentList
                                        key={e?.id}
                                        name={`${e?.firstName} ${e?.lastName}`}
                                        id={e?.id}
                                        loginId={e?.loginId}
                                        avatar={e?.avatar}
                                        gruop={widthwindow > 600 ? e?.group?.name : null}
                                        jdu={widthwindow > 1200 ? e?.jdu || "-" : null}
                                        jlpt={widthwindow > 1200 ? e?.jlpt || "-" : null}
                                        isSelcted={e?.isSelected}
                                        student={true}
                                    />
                                )
                            }
                        }) :
                            <div className={cls.StudentsPage__search}>
                                <p className={cls.StudentsPage__search__text}>
                                    {
                                        data?.length == 0 ? "学生はまだいません" : "気になるカテゴリーで学生を検索"
                                    }
                                </p>

                                <img
                                    src={'/Image/search1.png'}
                                    alt='img'
                                />
                            </div>
                        }
                        <div ref={ref} style={{ padding: "10px" }}></div>
                    </ul>
                </div>
            </Container>
            <TopStudents role={'recruitor'} students={data2} />
        </>
    )
})

export default StudentsPage;