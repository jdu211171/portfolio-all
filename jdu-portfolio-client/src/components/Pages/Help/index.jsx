
import Container from '../../UL/container'
import { AdressIcons, ClockIcons, EmailIcons, MinusIcons, PlussIcons, TelIcons } from '../../UL/icons'
import { useEffect, useState } from 'react'

import { Condition, Question } from "./data"
import cls from "./HelpPage.module.scss"
import { CanactGet } from '../../../services/decan'

export default function HelpPage() {
    const [id, setId] = useState(Question[0].id)
    const [data, setData] = useState()

    useEffect(() => {
        const fetchData = async () => {
            const res = await CanactGet();
            setData(res[0])
        }

        fetchData()
            .then((err) => {
                console.log(err);
            })
    }, [])
    return (
        <Container className={cls.HelpPage__container}>
            {/* <h3 className={cls.HelpPage__title}>システムについて</h3> */}
            {/* <p className={cls.HelpPage__text}>このシステムは、才能のある学生を特定し、学生の出席状況を監視するのに役立ちます。また、学生に関するすべての情報を1か所に収集し、1か所で確認できるようになります。さらに、学生の教育ローンを表示および管理するのに便利です。学生にとっては、お知らせやニュースを1か所から配信できるのは便利な点です。</p> */}

            <h2 className={cls.HelpPage__faq}>FAQ</h2>
            <div>
                {Question?.map(e => (
                    <div key={e?.id} className={cls.HelpPage__faq__wrap} >

                        <div onClick={() => setId(state => state == e?.id ? false : e?.id)}>
                            {id == e?.id ? <div className={cls.HelpPage__faq__minus}>
                                <div></div>
                            </div> : <PlussIcons />}
                        </div>
                        <div className={cls.HelpPage__faq__right}  >
                            <h4 onClick={() => setId(state => state == e?.id ? false : e?.id)} className={cls.HelpPage__faq__title}>{e?.title}</h4>
                            {id == e?.id ? <p className={cls.HelpPage__faq__text}>{e?.text}</p> : " "}
                        </div>
                    </div>
                ))}
            </div>

            <div className={cls.HelpPage__contact}>
                <div className={cls.HelpPage__contact__div}>
                    <div className={cls.HelpPage__contact__icon}>
                        <EmailIcons />
                    </div>
                    <p className={cls.HelpPage__contact__text}>{data?.emailInfo}</p>
                </div>
                <div className={cls.HelpPage__contact__div}>
                    <div className={cls.HelpPage__contact__icon}>
                        <TelIcons />
                    </div>
                    <p className={cls.HelpPage__contact__text}>{data?.phoneNumber}</p>
                </div>
                <div className={cls.HelpPage__contact__div}>
                    <div className={cls.HelpPage__contact__icon}>
                        <ClockIcons />
                    </div>
                    <p className={cls.HelpPage__contact__text}>{data?.startTime} ⁓ {data?.endTime}</p>
                </div>
                <div className={cls.HelpPage__contact__div}>
                    <div className={cls.HelpPage__contact__icon}>
                        <AdressIcons />
                    </div>
                    <p className={cls.HelpPage__contact__text}>{data?.location}</p>
                </div>
            </div>



        </Container>
    )
}
