import BlueButtun from '../../../UL/buttun/blueBtn'
import Filter from '../../../UL/filter'
import { PlusIcon } from '../../../UL/icons'
import TopList from '../../../UL/list/TopList'
import PersonList from '../../../UL/list/personList'
import DeleteMadel from '../../../UL/madals/deleteModel'
import AddMadal from '../../../UL/madals/AddMadal'
import AvatarInput from '../../../UL/input/AvatarInput'
import AddInput from '../../../UL/input/AddInput'

import React, { useState } from 'react'
import cls from "./StudentPage.module.scss"


import toast, { Toaster } from 'react-hot-toast';
import { useLocation, useNavigate, useSearchParams } from 'react-router-dom'
import { StudentsAdd, StudentsAllAdd, Studentsdelete } from '../../../../services/student'
import { useForm } from 'react-hook-form'
import Loader from '../../../UL/loader'
import { useQueryClient } from 'react-query'
import ExalInput from '../../../UL/input/exal'
import GruopList from '../../../UL/gruop'
import { AddGroup, Groupdelete, GroupGetById, UpdateGroup } from '../../../../services/gruop'

import UserCheckBoz from '../../../UL/userCheckBox'
import { useGetWindowWidth } from '../../../../hooks/useGetWindowWith'

const Course = [
    {
        id: "First",
        name: "1年生"
    },
    {
        id: "Second",
        name: "2年生"
    },
    {
        id: "Third",
        name: "3年生"
    },
    {
        id: "Fourth",
        name: "4年生"
    }
]



const StudentPage = React.forwardRef(({ data, gruop }, ref) => {
    const widthwindow = useGetWindowWidth()

    const queryClient = useQueryClient()
    const [openUser, setopenUser] = useState("inputs")
    const [params] = useSearchParams()
    const router = useNavigate()
    const [personId, setPersonId] = useState(false)
    const [personId2, setPersonId2] = useState(false)
    const [exal, setexal] = useState()
    const [openMadal, setOpenMadal] = useState(false)
    const [openMadal2, setOpenMadal2] = useState(false)
    const [loading, setLoading] = useState(false)
    const [exalError, setExalError] = useState(false)
    const [oneGruop, setOneGruop] = useState()
    const [year, setYears] = useState()
    const oneStuednt = data?.find(e => e.id === personId) || ""
    const oneStuednt2 = data?.find(e => e.id === personId2) || ""
    const [groupId, setGruopId] = useState(false)
    const [groupId1, setGrupId1] = useState()
    const [groupIdim, setGrupIdIm] = useState()
    const Lacation = useLocation()
    const query = Lacation?.search.split('?')?.[1]?.split('=')?.[1]
    const newDate = new Date()
    const { register, handleSubmit, reset, clearErrors, setError, watch, formState: { errors } } = useForm();

    const { register: register2, clearErrors: clearErrors2, handleSubmit: handleSubmit2, setError: setError2, setValue: setValue2, reset: reset2, watch: watch2, formState: { errors2 } } = useForm();
    const watchedFiles = watch2()
    const regex = /@jdu\.uz$/g;

    const fitchOnePerson1 = (id) => {
        setGruopId(id)
        const fetchData = async () => {
            const res = await GroupGetById(id);
            setOneGruop(res)
        }
        fetchData()
            .then((err) => {
            })
    }
    const fitchOnePerson = (id) => {
        const fetchData = async () => {
            const res = await GroupGetById(id);
            setValue2("name", res?.name)
            setValue2("collection", res?.collection)
            setYears(res?.year)

        }
        fetchData()
            .then((err) => {
            })
    }

    const AddGruopFunc = async (data) => {
        setLoading(true)
        if (year) {
            if (query == "false") {
                await AddGroup({ year, ...data })
                    .then(res => {
                        if (res?.data?.message) {
                            toast(res?.data?.message)

                        } else if (res.status == 201) {
                            toast('gruop created')
                            setOpenMadal2(false)

                        }
                        setLoading(false)
                        queryClient.invalidateQueries(['group'])
                    })
                    .catch(err => {
                        setLoading(false)
                    })
            } else if (query == "true") {
                await UpdateGroup({ year, ...data }, groupId1)
                    .then(res => {

                        if (res?.data?.message) {
                            toast(res?.data?.message)

                        } else if (res.status == 203) {
                            toast('gruop update')
                            setOpenMadal2(false)

                        }
                        setLoading(false)
                        queryClient.invalidateQueries(['group'])

                    })
                    .catch(err => {
                        setLoading(false)
                    })
            }
        } else {
            setLoading(false)
            setError2('year', { type: 'custom', message: "gruop year reqiured" })
        }
    }
    const AddStudentFunc = async (e) => {
        setLoading(true)
        if (exal) {
            const formData = new FormData()
            if (groupIdim) formData.append("groupId", groupIdim)
            formData.append("excel", exal)
            await StudentsAllAdd(formData)
                .then(res => {
                    if (res?.data?.message) {
                        setLoading(false)
                    }
                    if (res.status == 201) {
                        toast('Students created')
                        setOpenMadal(false)
                        reset()
                        setLoading(false)
                    }
                    setexal(null)
                })
                .catch(err => {
                    setExalError(true)
                    setLoading(false)
                })
        } else {
            if (regex.test(e?.email)) {

                const formData = new FormData()
                formData.append("loginId", e?.loginId)
                formData.append("email", e?.email)
                if (groupIdim) formData.append("groupId", groupIdim)
                await StudentsAdd(formData)
                    .then(res => {
                        if (res?.data?.message) {
                            setLoading(false)
                        }
                        if (res.status == 201) {
                            toast('Student created')
                            setOpenMadal(false)
                            reset()
                            setLoading(false)
                        }
                        queryClient.invalidateQueries(['student', params.get('Group'), params.get('groups'), params.get('group'), params.get('rate'), params.get('year'), params.get('search')])
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

    return (
        <div className={cls.StudentPage}>
            <div className={cls.StudentPage__filter}>
                <Filter page={"student"} decan={true} back={true} >
                    <BlueButtun className={cls.StudentPage__filter__btn} light={true} onClick={() => setOpenMadal(true)}>
                        <PlusIcon />
                        学生を追加
                    </BlueButtun>
                </Filter>


            </div>
            <div className={cls.StudentPage__page}>
                <div className={cls.StudentPage__page__div}>
                    <TopList text={["学生", widthwindow > 600 ? "学生ID" : null, widthwindow > 600 ? "グループ" : null, widthwindow > 1200 ? "JLPT" : null, widthwindow > 1200 ? "JDU日本語認定" : null, "アクション"]} />

                    {data && data?.map(e => (
                        <PersonList
                            onClick={() => router(`/decan/students/${e?.id}`)}
                            id={e?.loginId}
                            key={e?.id}
                            name={`${e?.firstName} ${e?.lastName}`}
                            img={e?.avatar}
                            action={true}
                            gruop={widthwindow > 600 ? e?.group?.name || "-" : null}
                            rate={widthwindow > 1200 ? e?.jlpt || "-" : null}
                            skill={widthwindow > 1200 ? e?.jdu || "-" : null}
                            update={() => router(`/decan/studentsSet/${e?.id}`)}
                            moveTo={() => setPersonId2(e?.id)}
                            remove={() => setPersonId(e?.id)}
                            student={true}
                        />
                    ))}
                    <div ref={ref} style={{ padding: "10px" }}></div>

                </div>
                <GruopList
                    data={[]}
                    decan={true}
                    setGrupIdIm={setGrupIdIm}
                    setGrupId1={setGrupId1}
                    fitchOnePerson1={fitchOnePerson1}
                    fitchOnePerson={fitchOnePerson}
                    update={() => {
                        router('?updete=true')
                        setOpenMadal2(true)
                        setGruopId(false)
                    }}
                    CreateGruop={() => {
                        setOpenMadal2(true)
                        router('?updete=false')
                        reset2()

                    }} />
            </div>
            {
                personId && <DeleteMadel
                    id={oneStuednt?.loginId}
                    name={`${oneStuednt?.firstName} ${oneStuednt?.lastName}`}
                    avater={oneStuednt?.avatar}
                    role={'student'}
                    progress={oneStuednt?.universityPercentage?.AllMarks}
                    years={`${+newDate.getFullYear() - oneStuednt.brithday?.split('-')[0]}歳 `}
                    remove={async () => {
                        setLoading(true)

                        await Studentsdelete(oneStuednt?.id)
                            .then(data => {
                                if (data) {
                                    toast("学生が削除されました")
                                    setLoading(false)
                                }
                                setPersonId(false)
                                setPersonId2(false)
                                setLoading(false)
                                queryClient.invalidateQueries(['student', params.get('Group'), params.get('group'), params.get('groups'), params.get('rate'), params.get('year'), params.get('search')])
                            })
                            .catch(err => {
                                toast(err)
                                setLoading(false)

                            })
                    }}
                    className={personId ? cls.openMadal : ''}
                    close={() => setPersonId(false)}
                />
            }
            {
                personId2 && <DeleteMadel
                    id={oneStuednt2?.loginId}
                    name={`${oneStuednt2?.firstName} ${oneStuednt2?.lastName}`}
                    avater={oneStuednt2?.avatar}
                    orginalId={oneStuednt2?.id}
                    role={'student'}
                    GroupChange={true}
                    defaultGruop={oneStuednt2?.groupId}
                    progress={oneStuednt2?.universityPercentage?.AllMarks}
                    years={`${+newDate.getFullYear() - oneStuednt2.brithday?.split('-')[0]}際 `}

                    className={personId2 ? cls.openMadal : ''}
                    close={() => {
                        setPersonId(false)
                        setPersonId2(false)
                    }}
                />
            }
            {
                openMadal &&
                <AddMadal
                    role={"学生を追加"}
                    OnSubmit={handleSubmit(AddStudentFunc)}
                    closeMadal={() => {
                        setOpenMadal(false)
                        reset()
                        setYears()
                    }}>

                    <UserCheckBoz openUser={openUser} setopenUser={setopenUser} />

                    {
                        openUser == 'inputs' ?
                            <>
                                <div className={cls.StudentPage__addInputs}>
                                    <AddInput
                                        register={!exal && { ...register('loginId', { required: "IDは必要です！" }) }}
                                        type={"text"}
                                        label={"ID"}
                                        placeholder={"ID"}
                                        alert={errors.loginId?.message}
                                        onChange={() => clearErrors("loginId")}
                                        style={{ marginTop: "4px" }}
                                        disabled={exal ? true : false}
                                    />
                                    <AddInput
                                        register={!exal && { ...register('email', { required: "電子メールは必要です！" }) }}
                                        type={"email"}
                                        label={"メール"}
                                        placeholder={"メール"}
                                        alert={errors.email?.message}
                                        onChange={() => clearErrors("email")}
                                        style={{ marginTop: "4px" }}
                                        disabled={exal ? true : false}
                                    />
                                </div>
                            </>
                            : ""}
                    {
                        openUser == 'excel' ?
                            <ExalInput
                                setResolv={setexal}
                                resolv={exal}
                                exalError={exalError}
                                onChange={(e) => {
                                    reset()
                                    setExalError(false)
                                }}
                            />
                            : ""}
                </AddMadal>}

            {openMadal2 &&
                <AddMadal
                    role={`${query == 'true' ? "グループを変更" : "グループを追加"} `}
                    OnSubmit={handleSubmit2(AddGruopFunc)}
                    closeMadal={() => {
                        setOpenMadal2(false)
                        reset2()

                    }}>
                    <div className={cls.StudentPage__addInputs}>
                        <AddInput
                            register={{ ...register2('name', { required: "name is required" }) }}
                            value={watchedFiles?.name || ''}
                            type={"text"}
                            label={"グループの名前"}
                            placeholder={"グループの名前"}
                            style={{ marginBottom: "10px" }}
                            // alert={errors2.name?.message}
                            onChange={() => clearErrors2("name")}
                        />
                        <AddInput
                            value={year}
                            type={"select"}
                            label={"学年"}
                            placeholder={"学年"}
                            Specialisation={Course}
                            // alert={errors2.year?.message}
                            style={{ marginBottom: "10px" }}
                            onChange={(e) => setYears(e)}
                        />
                        <AddInput
                            register={{ ...register2('collection', { required: "collection is required" }) }}
                            value={watchedFiles?.collection || ''}
                            type={"text"}
                            label={"学部"}
                            placeholder={"学部"}
                            style={{ marginBottom: "10px" }}
                        />
                    </div>
                </AddMadal>
            }

            {
                groupId && <DeleteMadel
                    id={oneGruop?.year}
                    name={oneGruop?.name}
                    collection={oneGruop?.collection}
                    years={`${oneGruop?.students?.length} students`}
                    role={'gruop'}
                    remove={async () => {
                        setLoading(true)
                        await Groupdelete(oneGruop?.id)
                            .then(data => {
                                setGruopId(false)
                                if (data) {
                                    toast("リクレーターが削除されました")
                                    setLoading(false)
                                }
                                setGrupId1(false)

                                setLoading(false)
                                queryClient.invalidateQueries(['group'])

                            }).catch(err => {
                                toast(err)
                                setLoading(false)

                            })
                    }}
                    className={groupId ? cls.openMadal : ''}
                    close={() => setGruopId(false)}
                />
            }
            <Toaster />

            {loading && <Loader onClick={() => setLoading(false)} />}

        </div>
    )
})
export default StudentPage;