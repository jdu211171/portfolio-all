import RightAsideWrapper from '../Aside/RightAsideWrapper'
import cls from "./topStudents.module.scss"
import { Student } from './data'
import TopStudentList from '../list/topStudent'
import { useNavigate } from 'react-router-dom'

export default function TopStudents({ students = [], role, count }) {
    const router = useNavigate()
    return (
        <RightAsideWrapper style={{ padding: "24px 20px 10px 24px" }}>
            <h3 className={cls.TopStudents__title}>気になる学生</h3>
            <p className={cls.TopStudents__text}>{count}以下は気になる学生 </p>

            {students?.map(e => {
                if (e.isSelected === true) {
                    return (
                        <TopStudentList
                            key={e.id}
                            avatar={e.avatar}
                            name={`${e?.firstName} ${e?.lastName}`}
                            progress={e?.loginId}
                            onClick={() => router(`/${role}/students/${e.id}`)}
                        />
                    )
                }
            })}
        </RightAsideWrapper>
    )
}
