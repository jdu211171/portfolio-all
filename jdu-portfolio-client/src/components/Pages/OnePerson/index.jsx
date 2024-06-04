import Container from '../..//UL/container'
import Person from '../..//UL/person'
import BackBtn from '../../UL/buttun/backBtn'


import { useNavigate } from 'react-router-dom'

import cls from "./Person.module.scss"
import BlueButtun from '../../UL/buttun/blueBtn'
import Avatar from 'react-avatar'
import { EmailIcons2, TelIcons2 } from '../../UL/icons'

const data = {
    id: 0,
    name: "Annette Black",
    skills: ['html', 'scss', 'java', 'node'],
    avater: '/Image/Ellipse08.png',
    progress: '98',
    rate: 4.7,
    year: "2 year",

}
export default function OnePerson({ loginId, firstName, position, section, lastName, email, avatar, student, bio, work }) {

    const router = useNavigate()
    return (
        <Container className={cls.OnePerson__container}>
            <div >
                <BackBtn onClick={() => router(-1)} style={{ marginBottom: "40px" }} />
                <Person id={loginId} name={`${firstName} ${lastName}`} position={position} section={section} email={email} avatar={avatar} year={work} />
            </div>
            {
                student || student?.length ? <div className={cls.OnePerson__person}>
                    <div className={cls.OnePerson__person__box} onClick={() => router(`/decan/students/${student?.[0]?.id}`)}>
                        {student?.[0].avatar ? <img
                            src={student?.[0].avatar}
                            width={60}
                            height={60}
                            alt={"img"}
                            style={{ borderRadius: "50%", objectFit: "cover" }}
                        /> : <Avatar name={`${student?.[0]?.firstName} ${student?.[0]?.lastName}`} size="64" round={64} />
                        }

                        <div className={cls.OnePerson__person__dv}>
                            <p className={cls.OnePerson__person__text}>{student?.[0].firstName} {student?.[0].lastName}</p>
                            <p className={cls.OnePerson__person__id}>ID:{student?.[0].loginId}</p>
                        </div>

                    </div>

                    <a href={`mailto:${student?.[0].email}`}> <EmailIcons2 />
                        <p>{student?.[0].email}</p>
                    </a>
                    <a href="#"> <TelIcons2 /> {student?.[0].phoneNumber}</a>
                </div> : ""
            }

        </Container>
    )
}
