import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { DecanPerson } from '../../../../services/decan'
import { GetCertificates } from '../../../../services/statistic'
import { TeacherGet } from '../../../../services/teacher'
import Container from '../../../UL/container'
import AddInput from '../../../UL/input/AddInput'
import AvatarInput from '../../../UL/input/AvatarInput'
import AddMadal from '../../../UL/madals/AddMadal'

import cls from "./homePage.module.scss"

export default function HomePage() {
    const [JDU, setJDU] = useState({})
    const [JLPT, setJLPT] = useState({})
    const [maxValue, setmaxValue] = useState(0)
    const [data, setData] = useState([])
    const [data2, setData2] = useState(0)
    const [openMadal, setOpenMadal] = useState(true)
    const { register, handleSubmit, reset, clearErrors, setError, setValue, watch, formState: { errors } } = useForm();


    useEffect(() => {
        const fetchData = async () => {
            const res = await GetCertificates();
            setJDU(res?.JDU)
            setJLPT(res?.JLPT)
            setmaxValue(res?.student)
        }
        fetchData()
            .then((err) => {
                console.log(err);
            })
        const fetchDecanPerson = async () => {
            const res = await DecanPerson();
            setData(res)
        }
        fetchDecanPerson()
            .then((err) => {
                console.log(err);
            })

        const fetchData2 = async () => {
            const res = await TeacherGet();
            setData2(res?.count)
        }
        fetchData2()
            .then((err) => {
                console.log(err);
            })

    }, [])


    return (
        <>
            <div className={cls.HomePage} >
                <div className={cls.HomePage__container} >
                    <h2 className={cls.HomePage__title}>JDUの学生については</h2>
                    <p className={cls.HomePage__text}>
                        本プラットフォームでは、学生たちの日本語のスキルを簡単に確認でき、その他の素晴らしい特徴も垣間見ることができます。学生たちの日本語のスキルは一目でわかります。彼らの自己紹介やプロフィールには、日本語での経験やライティングスキルが詳細に記載されています。学生たちは様々なバックグラウンドを持っています。留学経験や日本語の資格を持つ者から、日本企業への就職を目指す者まで、多岐にわたる才能がここに集結しています。これからの時代を担うリーダーとなる学生たち。その中でも、日本語スキルを武器にビジョンを持ち、挑戦に果敢に立ち向かう彼らがいます。
                    </p>
                </div>
                <div className={cls.HomePage__card}>
                    {
                        data && data?.map(e => (
                            <div className={cls.HomePage__card__card}>
                                <h2 className={cls.HomePage__card__card__title}>{e?.count}<span> /{e?.inActive} 非活性</span></h2>
                                {/* <p className={cls.HomePage__card__card__text}>User percentage: {e?.percentage}%</p> */}
                                <p className={cls.HomePage__card__card_role}>{e?.type}</p>
                            </div>
                        ))
                    }
                </div>
                <div className={cls.HomePage__chart}>
                    <div className={cls.HomePage__chart__wrap}>
                        <h3 className={cls.HomePage__chart__title}>JLPT</h3>
                        <p className={cls.HomePage__chart__text}>Japanese-Language Proficiency Test</p>
                        <div className={cls.HomePage__test__wrap} >
                            <div className={cls.HomePage__test__width}>
                                <div className={cls.HomePage__test} style={{ borderBottom: `${Math.round((((JLPT?.N1 / maxValue) * 100) / 100) * 185) || 2}px solid #5627DC` }}>
                                    {JLPT?.N1}
                                </div>
                                <p className={cls.HomePage__test_test} >N1</p>
                            </div>
                            <div className={cls.HomePage__test__width}>

                                <div className={cls.HomePage__test} style={{ borderBottom: `${Math.round((((JLPT?.N2 / maxValue) * 100) / 100) * 185) || 2}px solid #5627DC` }}>
                                    {JLPT?.N2}
                                </div>
                                <p className={cls.HomePage__test_test}>N2</p>
                            </div>
                            <div className={cls.HomePage__test__width}>
                                <div className={cls.HomePage__test} style={{ borderBottom: `${Math.round((((JLPT?.N3 / maxValue) * 100) / 100) * 185) || 2}px solid #5627DC` }}>
                                    {JLPT?.N3}
                                </div>
                                <p className={cls.HomePage__test_test} >N3</p>
                            </div>
                            <div className={cls.HomePage__test__width}>
                                <div className={cls.HomePage__test} style={{ borderBottom: `${Math.round((((JLPT?.N4 / maxValue) * 100) / 100) * 185) || 2}px solid #5627DC` }}>
                                    {JLPT?.N4}
                                </div>
                                <p className={cls.HomePage__test_test} >N4</p>
                            </div>
                            <div className={cls.HomePage__test__width}>
                                <div className={cls.HomePage__test} style={{ borderBottom: `${Math.round((((JLPT?.N5 / maxValue) * 100) / 100) * 185) || 2}px solid #5627DC` }}>
                                    {JLPT?.N5}
                                </div>
                                <p className={cls.HomePage__test_test}>N5</p>
                            </div>
                        </div>
                    </div>
                    <div className={cls.HomePage__chart__wrap}>
                        <h3 className={cls.HomePage__chart__title}>JDU日本語認定</h3>
                        <p className={cls.HomePage__chart__text}>Japan Digital University</p>
                        <div className={cls.HomePage__test__wrap}>
                            <div className={cls.HomePage__test__width}>
                                <div className={`${cls.HomePage__test} ${cls.HomePage__test2}`} style={{ borderBottom: `${Math.round((((JDU?.Q1 / maxValue) * 100) / 100) * 185) || 2}px solid #DC7E27` }}>
                                    {JDU?.Q1}
                                </div>
                                <p className={cls.HomePage__test2_test}>N1</p>
                            </div>
                            <div className={cls.HomePage__test__width}>
                                <div className={`${cls.HomePage__test} ${cls.HomePage__test2}`} style={{ borderBottom: `${Math.round((((JDU?.Q2 / maxValue) * 100) / 100) * 185) || 2}px solid #DC7E27` }}>
                                    {JDU?.Q2}
                                </div>
                                <p className={cls.HomePage__test2_test}>N2</p>
                            </div>
                            <div className={cls.HomePage__test__width}>
                                <div className={`${cls.HomePage__test} ${cls.HomePage__test2}`} style={{ borderBottom: `${Math.round((((JDU?.Q3 / maxValue) * 100) / 100) * 185) || 2}px solid #DC7E27` }}>
                                    {JDU?.Q3}
                                </div>
                                <p className={cls.HomePage__test2_test}>N3</p>
                            </div>
                            <div className={cls.HomePage__test__width}>
                                <div className={`${cls.HomePage__test} ${cls.HomePage__test2}`} style={{ borderBottom: `${Math.round((((JDU?.Q4 / maxValue) * 100) / 100) * 185) || 2}px solid #DC7E27` }}>
                                    {JDU?.Q4}
                                </div>
                                <p className={cls.HomePage__test2_test}>N4</p>
                            </div>
                            <div className={cls.HomePage__test__width}>
                                <div className={`${cls.HomePage__test} ${cls.HomePage__test2}`} style={{ borderBottom: `${Math.round((((JDU?.Q5 / maxValue) * 100) / 100) * 185) || 2}px solid #DC7E27` }}>
                                    {JDU?.Q5}
                                </div>
                                <p className={cls.HomePage__test2_test}>N5</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
