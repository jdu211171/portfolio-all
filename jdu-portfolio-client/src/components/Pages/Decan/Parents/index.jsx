import Filter from '../../../UL/filter'
import BlueButtun from '../../../UL/buttun/blueBtn'
import { PlusIcon } from '../../../UL/icons'
import AddInput from '../../../UL/input/AddInput'
import AvatarInput from '../../../UL/input/AvatarInput'
import PersonList from '../../../UL/list/personList'
import TopList from '../../../UL/list/TopList'
import AddMadal from '../../../UL/madals/AddMadal'
import DeleteMadel from '../../../UL/madals/deleteModel'

import React, { useState } from 'react'
import cls from "./Recruitor.module.scss"
import toast, { Toaster } from 'react-hot-toast';
import { useForm } from 'react-hook-form'
import { useLocation, useNavigate, useSearchParams } from 'react-router-dom'
import Loader from '../../../UL/loader'
import { useQueryClient } from 'react-query'
import ExalInput from '../../../UL/input/exal'
import { ParentAdd, Parentdelete, ParentUpdate, ParentGetById, ParentAllAdd } from '../../../../services/parent'
import { StudentsGetByloginId } from '../../../../services/student'
import { ImageUpload } from '../../../../utils/imageUpload'
import UserCheckBoz from '../../../UL/userCheckBox'
import { useGetWindowWidth } from '../../../../hooks/useGetWindowWith'

const PerantPage = React.forwardRef(({ data }, ref) => {
    const widthwindow = useGetWindowWidth()
    const queryClient = useQueryClient()
    const [params] = useSearchParams()

    const [openUser, setopenUser] = useState("inputs")
    const [personId, setPersonId] = useState(false)
    const [personId1, setPersonId1] = useState()
    const [avatar, setAvatar] = useState()
    const [studentName, setStudentName] = useState()
    const [studentOk, setStudentOk] = useState(false)
    const [loading, setLoading] = useState(false)
    const [exal, setexal] = useState()
    const oneStuednt = data.find(e => e.id === personId)
    const router = useNavigate()
    const Lacation = useLocation()
    const query = Lacation?.search.split('?')?.[1]?.split('=')?.[1]
    const [exalError, setExalError] = useState(false)
    const [openMadal, setOpenMadal] = useState(false)

    const { register, handleSubmit, reset, clearErrors, setError, setValue, watch, formState: { errors } } = useForm();
    const watchedFiles = watch()
    const fitchOnePerson = (id) => {
        const fetchData = async () => {
            const res = await ParentGetById(id);
            setValue("avatar", res?.avatar)
            setValue("firstName", res?.firstName)
            setValue("lastName", res?.lastName)
            setValue("phoneNumber", res?.phoneNumber)
            setValue("loginId", res?.loginId)
            setAvatar(data?.avatar)
            setValue("studentId", res?.Students?.[0]?.loginId)
            setValue("email", res?.email)
        }
        fetchData()
            .then((err) => {
            })
    }

    const getlogin = (id) => {
        setValue("studentId", id)
        if (!id?.length) {
            setStudentName(false)
        }
        const fetchData = async () => {
            const res = await StudentsGetByloginId(id);

            if (res && !res.parent) {
                setStudentOk(true)
                setStudentName(`${res?.firstName} ${res.lastName}`)
            } else if (res.parent) {
                setStudentOk(false)
                setStudentName("Student already has a parent")
            } else {
                setStudentOk(false)
                setStudentName("student not found")
            }
        }

        fetchData()
            .then((err) => {
            })
    }

    const AddStudentFunc = async (data) => {

        if (exal) {
            setLoading(true)
            const formData = new FormData()
            formData.append("excel", exal)
            await ParentAllAdd(formData)
                .then(res => {
                    if (res?.data?.message) {
                        setLoading(false)
                    }
                    if (res.status == 201) {
                        toast('Parents created')
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
            if (studentOk) {
                setLoading(true)
                await ParentAdd(data)
                    .then(res => {
                        if (res?.data?.message) {
                            toast(res?.data?.message)
                        } else if (res.status == 201) {
                            toast('parent created')
                            setOpenMadal(false)
                        }
                        setLoading(false)
                        queryClient.invalidateQueries(['parent', params.get('search'), params.get('year'), params.get('groups')])

                    })
                    .catch(err => {

                        setLoading(false)

                        if (err.response.data == "Validation isEmail on email failed") {
                            setError('email', { type: 'custom', message: "電子メールが存在しないか、スペルが間違っています" })
                            setLoading(false)
                        } if (err.response.data == "email must be unique") {
                            setError('email', { type: 'custom', message: "電子メールは一意である必要があります" })
                        }
                        if (err.response.data === "Validation len on password failed") {
                            setError('password', { type: 'custom', message: "パスワードの最小の長さは 8 文字である必要があります" })
                        }
                        setLoading(false)
                    })
            }
        }

    }


    const UpdateStudentFunc = async (data) => {

        setLoading(true)
        await ParentUpdate(data, personId1)
            .then(res => {
                if (res?.data?.message) {
                    toast(res?.data?.message)
                } else if (res.status == 203) {
                    toast('parent updated')
                    setOpenMadal(false)

                    setAvatar(null)
                }
                setLoading(false)
                queryClient.invalidateQueries(['parent', params.get('search'), params.get('year'), params.get('gruop')])
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
    return (
        <div className={cls.TeacherPage}>
            <div className={cls.TeacherPage__filter}>
                <Filter page={'parent'} >
                    <BlueButtun light={true} className={cls.TeacherPage__filter__btn} onClick={() => {
                        setOpenMadal(true)
                        router('?updete=false')
                        reset()
                    }
                    }>
                        <PlusIcon />
                        保護者を追加
                    </BlueButtun>
                </Filter>

            </div>
            <div className={cls.TeacherPage__div}>

                <TopList text={["保護者", widthwindow > 600 ? "保護者ID" : null, widthwindow > 1030 ? "学生" : null, widthwindow > 500 ? "電話番号" : null, widthwindow > 1130 ? "電子メール" : null, "アクション"]} />
                {data && data?.map(e => (
                    <PersonList
                        onClick={() => router(`/decan/parents/${e?.id}`)}
                        key={e?.id}
                        img={e?.avatar}
                        id={e?.loginId}
                        name={`${e?.firstName} ${e?.lastName}`}
                        gruop={widthwindow > 1030 ? e?.Students?.[0].firstName : null}
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
                ))}
                <div ref={ref} style={{ padding: "10px" }}></div>
            </div>
            {
                personId && <DeleteMadel
                    id={oneStuednt?.loginId}
                    name={`${oneStuednt?.firstName} ${oneStuednt?.lastName}`}
                    avater={oneStuednt?.avatar}
                    role={'Parent'}
                    progress={oneStuednt?.progress}
                    years={oneStuednt?.companyName}
                    remove={async () => {
                        setLoading(true)
                        await Parentdelete(oneStuednt?.id)
                            .then(data => {
                                if (data) {
                                    toast("リクレーターが削除されました")
                                    setLoading(false)
                                }
                                setPersonId(false)
                                setLoading(false)
                                queryClient.invalidateQueries(['parents', params.get('search'), params.get('year'), params.get('gruop')])

                            }).catch(err => {
                                toast(err)
                                setLoading(false)

                            })

                    }}
                    className={personId ? cls.openMadal : ''}
                    close={() => setPersonId(false)}
                />
            }
            {openMadal && query == 'true' &&
                <AddMadal
                    role={`${query == 'true' ? "保護者を変更" : "保護者の追加"} `}
                    OnSubmit={handleSubmit(UpdateStudentFunc)}
                    style={{ maxWidth: "775px" }}
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
                            responsive={true}
                            register={{ ...register('loginId', { required: "IDは必要です！" }) }}
                            type={"text"}
                            label={"Id"}
                            placeholder={"Id"}
                            value={watchedFiles?.loginId || ''}
                            geterat={true}
                            loginGenerate={(e) => setValue("loginId", e)}
                            alert={errors.loginId?.message}
                            onChange={() => clearErrors("loginId")}
                            style={{ marginBottom: "20px" }}

                        />
                        <AddInput
                            responsive={true}
                            register={{ ...register('studentId', { required: "IDは必要です！" }) }}
                            type={"text"}
                            label={"Student ID"}
                            placeholder={"Id"}
                            value={watchedFiles?.studentId || ''}
                            geterat={true}
                            loginGenerate={(e) => setValue("studentId", e)}
                            alert={errors.studentId?.message}
                            onChange={() => { clearErrors("studentId") }}
                            style={{ marginBottom: "20px" }}

                        />
                        <AddInput
                            responsive={true}
                            register={{ ...register('email', { required: "電子メールは必要です！" }) }}
                            type={"email"}
                            label={"電子メール"}
                            placeholder={"電子メール"}
                            value={watchedFiles?.email || ''}
                            alert={errors.email?.message}
                            onChange={() => clearErrors("email")}
                            style={{ marginBottom: "20px" }}


                        />
                    </div>
                </AddMadal>
            }
            {openMadal && query == 'false' &&
                <AddMadal
                    role={`${query == 'true' ? "保護者を更新" : "保護者の追加"} `}
                    OnSubmit={handleSubmit(AddStudentFunc)}
                    closeMadal={() => {
                        setOpenMadal(false)
                        setAvatar(null)
                        reset()
                    }}>
                    <UserCheckBoz openUser={openUser} setopenUser={setopenUser} />
                    {
                        openUser == 'inputs' ?
                            <>

                                <div className={cls.TeacherPage__addInputs}>
                                    <AddInput

                                        register={!exal && { ...register('loginId', { required: "IDは必要です！" }) }}
                                        type={"text"}
                                        label={"ID"}
                                        placeholder={"ID"}
                                        geterat={true}
                                        loginGenerate={(e) => setValue("loginId", e)}
                                        alert={errors.loginId?.message}
                                        onChange={() => clearErrors("loginId")}
                                        style={{ marginBottom: "20px" }}
                                        disabled={exal ? true : false}
                                    />
                                    <AddInput

                                        register={!exal && { ...register('email', { required: "電子メールは必要です！" }) }}
                                        type={"email"}
                                        label={"電子メール"}
                                        placeholder={"電子メール"}
                                        alert={errors.email?.message}
                                        onChange={() => clearErrors("email")}
                                        style={{ marginBottom: "20px" }}
                                        disabled={exal ? true : false}
                                    />
                                </div>
                                <div className={cls.TeacherPage__addInputs} style={{ alignItems: "center" }}>
                                    <AddInput

                                        type={"text"}
                                        label={"Student ID"}
                                        placeholder={"Student ID"}
                                        onChange={(e) => {
                                            getlogin(e.target.value)
                                        }}
                                        style={{ marginBottom: "20px" }}
                                        disabled={exal ? true : false}
                                    />

                                    {studentName ? <p className={cls.TeacherPage__texterorr}> {studentName}</p> : ""}
                                </div>
                            </>
                            : ""}
                    {
                        openUser == 'excel' ?
                            <ExalInput
                                setResolv={setexal}
                                resolv={exal}
                                exalError={exalError}
                                parent={true}
                                onChange={(e) => {
                                    reset()
                                    setExalError(false)
                                }}
                            />
                            : ""}
                </AddMadal>
            }
            <Toaster />

            {loading && <Loader onClick={() => setLoading(false)} />}
        </div >
    )
})

export default PerantPage;