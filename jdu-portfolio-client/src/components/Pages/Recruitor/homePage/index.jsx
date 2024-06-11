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
import { Link } from 'react-router-dom';
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
            <div className={cls.HomePage}>
                <div className={cls.HomePage__container}>
                    <h1 className={cls.HomePage__titleh1}>Japan Digital University</h1>
                    <hr className={cls.HomePage__line} />
                    <h2 className={cls.HomePage__title}>
                        <span className={cls.HomePage__titleBlack}>より良い</span>
                        <br />
                        <span className={cls.HomePage__titleRed}>明日へ</span>
                    </h2>
                    <p className={cls.HomePage__text}>
                        2020年に日本資本がウズベキスタンに設立し運営している正式な私立大学です。ウズベキスタンにあるサテライトキャンパスをJDUと呼びます。ウズベキスタンの学生は、提携している日本の大学の授業にオンラインで参加し、日本の大学の試験を経て単位取得、卒業を目指します。（日本とウズベキスタン両国の学位を取得し卒業することが可能です）卒業時には日本企業への就職を目指し、勉学に励む学生がたくさん入学しています。
                    </p>
                    <div className={cls.HomePage__images}>
                        <div className={cls.HomePage__img}>
                            <img
                                src={'/Image/BigPicture.jpg'}
                                alt='img'
                                width={500}
                                height={340}
                            />
                        </div>
                        <div className={cls.HomePage__imgSmall}>
                            <img
                                src={'/Image/SmallPicture.jpg'}
                                alt='img'
                                width={355}
                                height={213}
                            />
                        </div>
                    </div>
                    <Link to="/recruitor/students" className={cls.HomePage__button}>次へ ➜</Link>
                </div>
            </div>

            {openMadal && !user?.isActive &&
                <div className={cls.overlay} style={{ display: openMadal ? 'block' : 'none' }}>
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
                </div>
            }
            <Toaster />
            {loading && <Loader onClick={() => setLoading(false)} />}
        </>
    )
}