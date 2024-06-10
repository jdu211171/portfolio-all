import BlueButtun from '../../../UL/buttun/blueBtn'

import Filter from '../../../UL/filter'
import { PlusIcon } from '../../../UL/icons'
import AddInput from '../../../UL/input/AddInput'
import AvatarInput from '../../../UL/input/AvatarInput'
import PersonList from '../../../UL/list/personList'
import TopList from '../../../UL/list/TopList'
import AddMadal from '../../../UL/madals/AddMadal'
import DeleteMadel from '../../../UL/madals/deleteModel'


import React, { useState } from 'react'

import cls from "./Teacher.module.scss"
import toast, { Toaster } from 'react-hot-toast';
import { useLocation, useNavigate, useSearchParams } from 'react-router-dom'
import { TeacherAdd, TeacherAllAdd, Teacherdelete, TeacherGetById, TeacherUpdate } from '../../../../services/teacher'
import { useForm } from 'react-hook-form'
import Loader from '../../../UL/loader'
import ExalInput from '../../../UL/input/exal'
import { useQueryClient } from 'react-query'
import { ImageUpload } from '../../../../utils/imageUpload'
import UserCheckBoz from '../../../UL/userCheckBox'
import { useGetWindowWidth } from '../../../../hooks/useGetWindowWith'

const lavozim = [
    {
        id: "部長",
        name: "部長",
    },
    {
        id: "リーダー",
        name: "リーダー",
    },
    {
        id: "担当者",
        name: "担当者",
    }
]

const SectionArr = [
    {
        id: "学長室",
        name: "学長室",
    },
    {
        id: "広報部",
        name: "広報部",
    },
    {
        id: "新しいプロジェクト部",
        name: "新しいプロジェクト部",
    }
]


const TeacherPage = React.forwardRef(({ data }, ref) => {
    const widthwindow = useGetWindowWidth()
    const queryClient = useQueryClient()
    const [params] = useSearchParams()
    const [personId, setPersonId] = useState(false)
    const [openMadal, setOpenMadal] = useState(false)
    const oneStuednt = data.find(e => e.id === personId)
    const [loading, setLoading] = useState(false)
    const [role, setRole] = useState("teacher")
    const [openUser, setopenUser] = useState("inputs")
    const router = useNavigate()
    const [exalError, setExalError] = useState(false)
    const [personId1, setPersonId1] = useState()
    const [avatar, setAvatar] = useState()
    const [section, setSection] = useState()
    const [section1, setSection1] = useState()
    const [section2, setSection2] = useState()
    const [section3, setSection3] = useState()
    const [userRole, setSetUserRole] = useState()
    const [section4, setSection4] = useState()
    const [exal, setexal] = useState()

    const Lacation = useLocation()
    const query = Lacation?.search.split('?')?.[1]?.split('=')?.[1]
    const { register, handleSubmit, reset, clearErrors, setError, setValue, watch, formState: { errors } } = useForm();
    const watchedFiles = watch()
    const regex = /@jdu\.uz$/g;
    const fitchOnePerson = (id) => {
        const fetchData = async () => {
            const res = await TeacherGetById(id);
            setSetUserRole(res?.role)
            if (res.role == "staff") {
                setSection(SectionArr)
            }

            setValue("avatar", res?.avatar)
            setValue("firstName", res?.firstName)
            setValue("lastName", res?.lastName)
            setValue("companyName", res?.companyName)

            setSection1(res?.section)
            const value = data.find(el => el?.name == res?.section)
            setSection2(value?.specialisations)
            setSection3(res?.specialisation)
            setSection4(res?.position)
            setValue("phoneNumber", res?.phoneNumber)
            setValue("email", res?.email)
            setValue("loginId", res?.loginId)
            setAvatar(data?.avatar)
        }
        fetchData()
            .then((err) => {
                console.log(err);
            })
    }
    const AddStudentFunc = async (data) => {
        setLoading(true)
        if (exal) {
            const formData = new FormData()
            formData.append("excel", exal)
            formData.append("role", role)
            await TeacherAllAdd(formData)
                .then(res => {
                    if (res?.data?.message) {
                        setLoading(false)
                    }
                    if (res.status == 201) {
                        toast('Em created')
                        setOpenMadal(false)
                        reset()
                        setLoading(false)
                    }
                    setexal(null)
                })
                .catch(err => {
                    setLoading(false)
                    setExalError(true)
                })
        } else {
            if (regex.test(data?.email)) {
                await TeacherAdd({ role: role, ...data })
                    .then(res => {
                        if (res?.data?.message) {
                            toast(res?.data?.message)
                        } else if (res.status == 201) {
                            toast('recrutiar created')
                            setOpenMadal(false)
                        }
                        setLoading(false)
                        queryClient.invalidateQueries(['teachers', params.get('search'), params.get('specialisation')])
                    })
                    .catch(err => {
                        if (err.response.data.message.includes('loginId') || err.response.data.message.includes('Login')) {
                            setError('loginId', { type: 'custom', message: "IDまたはパスワードが間違っています" })
                            setLoading(false)
                        }
                        if (err.response.data.message == "Validation isEmail on email failed") {
                            setError('email', { type: 'custom', message: "メールが存在しないか、スペルが間違っています" })
                            setLoading(false)
                        } if (err.response.data.message === "email must be unique") {
                            setError('email', { type: 'custom', message: "電子メールは一意である必要があります" })
                        }
                        if (err.response.data.message === "Validation len on password failed") {
                            setError('password', { type: 'custom', message: " パスワードの最小の長さは 8 文字である必要があります" })
                        }
                        if (err.response.data.message.includes("type integer")) {
                            setError('courseNumber', { type: 'custom', message: "コース番号は数値でなければなりません" })
                        }
                        setLoading(false)
                    })
            } else {
                setLoading(false)
                setError('email', { type: 'custom', message: "email must include jdu.uz" })
            }
        }
    }


    const UpdatetudentFunc = async (data) => {
        setLoading(true)

        await TeacherUpdate({ section: section1, specialisation: section3, position: section4, isActive: true, ...data }, personId1)
            .then(res => {
                if (res?.data?.message) {
                    toast(res?.data?.message)
                } else if (res.status == 203) {
                    toast('registor seccessful')
                    setOpenMadal(false)
                    setAvatar(null)
                }
                setLoading(false)
                queryClient.invalidateQueries(['teachers', params.get('search'), params.get('specialisation'), params.get('role')])
            })
            .catch(err => {
                if (err.response.data.message.includes('loginId') || err.response.data.message.includes('Login')) {
                    setError('loginId', { type: 'custom', message: err.response.data.message })
                    setLoading(false)
                }
                if (err.response.data.message == "Validation isEmail on email failed") {
                    setError('email', { type: 'custom', message: "メールが存在しないか、スペルが間違っています" })
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


    return (
        <div className={`${cls.TeacherPage}`}>
            <div className={cls.TeacherPage__filter}>
                <Filter page={"staff"} >
                    <BlueButtun light={true} className={cls.TeacherPage__filter__btn} onClick={() => {
                        setOpenMadal(true)
                        router('?updete=false')
                        reset()

                    }}>
                        <PlusIcon />
                        職員を追加
                    </BlueButtun>
                </Filter>
            </div>

            <div className={cls.TeacherPage__div}>

                <TopList text={["職員", widthwindow > 600 ? "職員ID" : null, widthwindow > 1030 ? "部署" : null, widthwindow > 500 ? "電話番号" : null, widthwindow > 1130 ? "電子メール" : null, "アクション"]} />
                {data &&
                    data?.map(e => (
                        <PersonList
                            onClick={() => router(`/decan/employees/${e?.id}`)}
                            key={e?.id}
                            img={e?.avatar}
                            id={e?.loginId}
                            name={`${e?.firstName} ${e?.lastName}`}
                            gruop={widthwindow > 1030 ? e?.section || "null" : null}
                            phone={widthwindow > 500 ? e?.phoneNumber : null}
                            email={widthwindow > 1130 ? e?.email : null}
                            action={true}
                            remove={() => setPersonId(e?.id)}
                            update={() => {
                                router('?updete=true')
                                setOpenMadal(true)
                                setPersonId(false)
                                setPersonId1(e?.id)
                                fitchOnePerson(e?.id)
                            }}
                        />
                    ))

                }
                <div ref={ref} style={{ padding: "10px" }}></div>
            </div>
            {
                personId && <DeleteMadel
                    id={oneStuednt?.loginId}
                    name={oneStuednt?.firstName}
                    avater={oneStuednt?.avatar}
                    role={'teacher'}
                    progress={oneStuednt?.progress}
                    years={""}
                    remove={async () => {
                        setLoading(true)
                        await Teacherdelete(oneStuednt?.id)
                            .then(data => {
                                if (data) {
                                    toast("emloy deleted")
                                    setLoading(false)
                                }
                                setPersonId(false)

                                setLoading(false)
                                queryClient.invalidateQueries(['teachers', params.get('position'), params.get('search'), params.get('specialisation'), params.get('role')])

                            }).catch(err => {
                                toast(err)
                                setLoading(false)

                            })


                    }}
                    className={personId ? cls.openMadal : ''}
                    close={() => setPersonId(false)}
                />
            }
            {
                openMadal && query == "true" &&
                <AddMadal
                    role={"職員を変更"}
                    style={{ maxWidth: "775px" }}
                    OnSubmit={handleSubmit(UpdatetudentFunc)}
                    closeMadal={() => {
                        setOpenMadal(false)
                        setAvatar(null)
                        reset()
                    }}>
                    <AvatarInput
                        onChange={(e) => hendleimg(e)}
                        url={avatar || watchedFiles?.avatar}
                        style={{ marginBottom: '43px' }}
                    />
                    <div className={cls.TeacherPage__addInputs}>
                        <AddInput
                            responsive={true}
                            register={{ ...register('firstName', { required: "名前は必要です！" }) }}
                            type={"text"}
                            label={"名前"}
                            placeholder={"名前"}
                            value={watchedFiles?.firstName || ''}
                            alert={errors.firstName?.message}
                            onChange={() => clearErrors("firstName")}
                            style={{ marginBottom: "20px" }}

                        />
                        <AddInput
                            responsive={true}
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
                            responsive={true}
                            type={"text"}
                            label={"ID"}
                            placeholder={"ID"}
                            value={watchedFiles?.loginId || ''}
                            alert={errors.loginId?.message}
                            style={{ marginBottom: "20px" }}
                            onChange={() => clearErrors("loginId")}
                        />
                        <AddInput
                            responsive={true}
                            type={"select"}
                            label={"部署"}
                            placeholder={"部署"}
                            value={section1}
                            style={{ marginBottom: "20px" }}
                            Specialisation={section}
                            onChange={(e) => {
                                const data = section.find(el => el?.id == e)
                                setSection1(data?.name)
                                setSection2(data?.specialisations)
                            }}
                        />

                        {userRole == "teacher" && <AddInput
                            responsive={true}
                            type={"select"}
                            label={"職員"}
                            placeholder={"職員"}
                            value={section3}
                            Specialisation={section2}
                            style={{ marginBottom: "20px" }}
                            onChange={(e) => {
                                const data = section2.find(el => el?.id == e)
                                setSection3(data?.name)
                            }}
                        />}

                        <AddInput
                            responsive={true}
                            type={"select"}
                            label={"役職"}
                            placeholder={"役職"}
                            value={section4}
                            style={{ marginBottom: "20px" }}
                            Specialisation={lavozim}
                            onChange={(e) => setSection4(e)}
                        />

                        <AddInput
                            responsive={true}
                            register={{ ...register('email', { required: "メールは必要です！" }) }}
                            type={"email"}
                            label={"電子メール"}
                            placeholder={"電子メール"}
                            value={watchedFiles?.email || ''}
                            alert={errors.email?.message}
                            onChange={() => clearErrors("email")}
                            style={{ marginBottom: "20px" }}
                        />

                        <AddInput
                            responsive={true}
                            register={{ ...register('phoneNumber', { required: "名前は必要です！" }) }}
                            type={"text"}
                            label={"電話番号"}
                            placeholder={"電話番号"}
                            value={watchedFiles?.phoneNumber || ''}
                            alert={errors.phoneNumber?.message}
                            onChange={() => clearErrors("firstName")}
                            style={{ marginBottom: "20px" }}

                        />

                    </div>
                </AddMadal>
            }

            {
                openMadal && query == "false" &&
                <AddMadal
                    role={"職員を追加   "}
                    OnSubmit={handleSubmit(AddStudentFunc)}
                    closeMadal={() => setOpenMadal(false)}>

                    <div className={cls.TeacherPage__checkBox}>
                        <label className={`${role == "teacher" ? cls.TeacherPage__checkBox__active : ""}`}>
                            <input
                                name='role'
                                type={"radio"}
                                value={"teacher"}
                                checked={role == "teacher" ? true : false}
                                onChange={(e) => setRole(e.target.value)}
                            />
                            <p > 先生</p>
                        </label>
                        <label className={`${role == "staff" ? cls.TeacherPage__checkBox__active : ""}`}>
                            <input
                                name='role'
                                type={"radio"}
                                value={"staff"}
                                checked={role == "staff" ? true : false}
                                onChange={(e) => setRole(e.target.value)}
                            />
                            <p>一般の職員</p>
                        </label>
                    </div>
                    <UserCheckBoz openUser={openUser} setopenUser={setopenUser} />
                    {
                        openUser == "inputs" && <div className={cls.TeacherPage__addInputs}>
                            <AddInput
                                register={!exal && { ...register('loginId', { required: "IDは必要です！" }) }}
                                type={"text"}
                                label={"ID"}
                                placeholder={"ID"}
                                style={{ marginTop: "4px" }}
                                onChange={() => clearErrors("loginId")}
                                alert={errors.loginId?.message}
                                value={watchedFiles?.loginId || ''}
                                disabled={exal ? true : false}
                            />
                            <AddInput
                                register={!exal && { ...register('email', { required: "電子メールは必要です！" }) }}
                                type={"email"}
                                label={"電子メール"}
                                placeholder={"電子メール"}
                                style={{ marginTop: "4px" }}
                                onChange={() => clearErrors("email")}
                                alert={errors.email?.message}
                                value={watchedFiles?.email || ''}
                                disabled={exal ? true : false}
                            />
                        </div>
                    }
                    {

                        openUser == "excel" && < ExalInput setResolv={setexal} exalError={exalError} resolv={exal} onChange={() => {
                            reset()
                            setExalError(false)
                        }} />
                    }

                </AddMadal>
            }
            <Toaster />
            {loading && <Loader onClick={() => setLoading(false)} />}
        </div>
    )
})

export default TeacherPage;