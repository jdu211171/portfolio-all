import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { RecruitorUpdate } from '../../../../services/recruter'
import { GetCertificates, GetStudentgroupRec } from '../../../../services/statistic'
import { TeacherGet } from '../../../../services/teacher'
import Container from '../../../UL/container'
import AddInput from '../../../UL/input/AddInput'
import AvatarInput from '../../../UL/input/AvatarInput'
import Loader from '../../../UL/loader'
import AddMadal from '../../../UL/madals/AddMadal'
import toast, { Toaster } from 'react-hot-toast';

import cls from "./homePage.module.scss"
import { TopStudentsGet } from '../../../../services/student'
import { Loginout } from '../../../../services/auth'
import { useNavigate } from 'react-router-dom'
import { ImageUpload } from '../../../../utils/imageUpload'

export default function HomePage({ user }) {

    const [JDU, setJDU] = useState({})
    const [JLPT, setJLPT] = useState({})
    const [maxValue, setmaxValue] = useState(0)
    const [data2, setData2] = useState([])
    const [avatar, setAvatar] = useState()
    const [openMadal, setOpenMadal] = useState(!user?.isActive)
    const [loading, setLoading] = useState(false)
    const { register, handleSubmit, reset, clearErrors, setError, setValue, watch, formState: { errors } } = useForm();
    const watchedFiles = watch()
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
        const fetchData3 = async () => {
            const res = await TopStudentsGet();


        }
        fetchData3()
            .then((err) => {
                console.log(err);
            })
        const fetchData2 = async () => {
            const res = await GetStudentgroupRec();
            setData2(res)

        }
        fetchData2()
            .then((err) => {
                console.log(err);
            })

    }, [])

    useEffect(() => {
        setValue("firstName", user?.firstName)
        setValue("lastName", user?.lastName)
    }, [user])

    const UpdateStudentFunc = async (data) => {
        setLoading(true)
        const formData = new FormData()
        if (data.avatar) formData.append("avatar", data.avatar)
        formData.append("firstName", data?.firstName)
        formData.append("lastName", data?.lastName)
        formData.append("companyName", data?.companyName)
        formData.append("phoneNumber", data?.phoneNumber)
        formData.append("email", user?.email)
        formData.append("loginId", user?.loginId)
        formData.append("isActive", true)

        formData.append("bio", data?.bio)


        await RecruitorUpdate(formData, user?.id)
            .then(res => {
                if (res?.data?.message) {
                    toast(res?.data?.message)
                } else if (res.status == 203) {
                    toast('registor seccessful')
                    setOpenMadal(false)
                    setAvatar(null)
                }
                setLoading(false)


            })
            .catch(err => {
                if (err.response.data.message.includes('loginId') || err.response.data.message.includes('Login')) {
                    setError('loginId', { type: 'custom', message: err.response.data.message })
                    setLoading(false)
                }
                if (err.response.data.message == "Validation isEmail on email failed") {
                    setError('email', { type: 'custom', message: "電子メールが存在しないか、スペルが間違っています" })
                    setLoading(false)
                } if (err.response.data.message === "email must be unique") {
                    setError('email', { type: 'custom', message: "電子メールは一意である必要があります" })
                }
                if (err.response.data.message === "Validation len on password failed") {
                    setError('password', { type: 'custom', message: "パスワードの最小の長さは 8 文字である必要があります" })
                }
                setLoading(false)
            })
    }



    const hendleimg = async (e) => {
        if (e.target.files[0]) {
            const data = await ImageUpload(e.target.files[0])
            setValue('avatar', data?.url)
            setAvatar(URL.createObjectURL(e.target.files[0]))
        }
    }
    const router = useNavigate()

    return (
        <>
            <div className={cls.HomePage} >
                <div className={cls.HomePage__container} >
                    <h2 className={cls.HomePage__title}>JDUの学生については</h2>
                    <p className={cls.HomePage__text}>
                        本プラットフォームでは、学生たちの日本語のスキルを簡単に確認でき、その他の素晴らしい特徴も垣間見ることができます。学生たちの日本語のスキルは一目でわかります。彼らの自己紹介やプロフィールには、日本語での経験やライティングスキルが詳細に記載されています。学生たちは様々なバックグラウンドを持っています。留学経験や日本語の資格を持つ者から、日本企業への就職を目指す者まで、多岐にわたる才能がここに集結しています。これからの時代を担うリーダーとなる学生たち。その中でも、日本語スキルを武器にビジョンを持ち、挑戦に果敢に立ち向かう彼らがいます。
                    </p>
                    <div className={cls.HomePage__img}>
                        {/* <img
                            src={'/Image/image1.png'}
                            alt='img'
                            width={269}
                            height={197}
                        /> */}
                    </div>

                </div>

                <div className={cls.HomePage__card}>
                    <div className={cls.HomePage__card__card}>
                        <h2 className={cls.HomePage__card__card__title}>{data2?.First?.count}</h2>
                        {/* <p className={cls.HomePage__card__card__text}>Percent: {Math.floor(+data2?.First?.percentage)}%</p> */}
                        <p className={cls.HomePage__card__card_role}>1年生</p>
                    </div>
                    <div className={cls.HomePage__card__card}>
                        <h2 className={cls.HomePage__card__card__title}>{data2?.Second?.count}</h2>
                        {/* <p className={cls.HomePage__card__card__text}>Percent: {Math.floor(+data2?.Second?.percentage)}%</p> */}
                        <p className={cls.HomePage__card__card_role}>2年生</p>
                    </div>
                    <div className={cls.HomePage__card__card}>
                        <h2 className={cls.HomePage__card__card__title}>{data2?.Third?.count}</h2>
                        {/* <p className={cls.HomePage__card__card__text}>Percent: {Math.floor(+data2?.Third?.percentage)}%</p> */}
                        <p className={cls.HomePage__card__card_role}>3年生</p>
                    </div>
                    <div className={cls.HomePage__card__card}>
                        <h2 className={cls.HomePage__card__card__title}>{data2?.Fourth?.count}</h2>
                        {/* <p className={cls.HomePage__card__card__text}>Percent: {Math.floor(+data2?.Fourth?.percentage)}%</p> */}
                        <p className={cls.HomePage__card__card_role}>4年生</p>
                    </div>
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

            {openMadal && !user?.isActive &&
                <AddMadal
                    role={"登録"}
                    update={true}
                    style={{ maxWidth: "775px" }}
                    OnSubmit={handleSubmit(UpdateStudentFunc)}
                    closeMadal={async () => {
                        await Loginout()
                        router('/auth/login')
                    }}
                >
                    <AvatarInput
                        onChange={(e) => hendleimg(e)}
                        url={avatar || watchedFiles?.avatar}
                        style={{ marginBottom: '43px' }}
                    />
                    <div className={cls.HomePage__addInputs}>

                        <AddInput
                            register={{ ...register('firstName', { required: "名前は必要です！" }) }}
                            type={"text"}
                            label={"名字"}
                            placeholder={"名字"}
                            value={watchedFiles?.firstName || ''}
                            alert={errors.firstName?.message}
                            onChange={() => clearErrors("firstName")}
                            style={{ marginBottom: "20px" }}

                        />
                        <AddInput
                            register={{ ...register('lastName', { required: "名字は必要です！" }) }}
                            type={"text"}
                            label={"名字"}
                            placeholder={"名字"}
                            value={watchedFiles?.lastName || ''}
                            alert={errors.lastName?.message}
                            onChange={() => clearErrors("lastName")}
                            style={{ marginBottom: "20px" }}

                        />
                        <AddInput
                            type={"text"}
                            label={"Id"}
                            placeholder={"Id"}
                            value={user?.loginId}
                            style={{ marginBottom: "20px" }}
                            disabled={true}
                        />
                        <AddInput
                            register={{ ...register('phoneNumber', { required: "電話番号は必要です！" }) }}
                            type={"text"}
                            label={"電話番号"}
                            placeholder={"電話番号"}
                            value={watchedFiles?.phoneNumber || ''}
                            alert={errors.phoneNumber?.message}
                            onChange={() => clearErrors("phoneNumber")}
                            style={{ marginBottom: "20px" }}
                        />
                        <AddInput
                            register={{ ...register('companyName', { required: "会社名は必要です！" }) }}
                            type={"text"}
                            label={"会社名"}
                            placeholder={"会社名"}
                            value={watchedFiles?.companyName || ''}
                            alert={errors.companyName?.message}
                            onChange={() => clearErrors("companyName")}
                            style={{ marginBottom: "20px" }}

                        />

                        <AddInput
                            type={"text"}
                            label={"電子メール"}
                            placeholder={"電子メール"}
                            value={user?.email}
                            alert={errors.email?.message}
                            onChange={() => clearErrors("email")}
                            style={{ marginBottom: "20px" }}
                            disabled={true}
                        />
                    </div>
                </AddMadal>
            }
            <Toaster />
            {loading && <Loader onClick={() => setLoading(false)} />}
        </>
    )
}
