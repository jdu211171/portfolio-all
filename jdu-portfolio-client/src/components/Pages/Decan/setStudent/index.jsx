'use client'

import BlueButtun from '../../../UL/buttun/blueBtn'
import CancelBtn from '../../../UL/buttun/cancel'
import Container from '../../../UL/container'
import { BusketDeleteIcons, BusketDeleteIcons2, DownloadIcons, GalaryIcons, LeftIcon, UploadIcons } from '../../../UL/icons'
import AddInput from '../../../UL/input/AddInput'

import React, { useEffect, useRef, useState } from 'react'
import cls from "./SetStudent.module.scss"
import { useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { FileUploadStudent, GetSkills, PhotoDeleteStudent, PhotoUploadStudent, StudentsUpdate } from '../../../../services/student'
import toast, { Toaster } from 'react-hot-toast'
import Avatar from 'react-avatar'
import Loader from '../../../UL/loader'
import { FileRemove } from '../../../../services/upload'
import { ImageUpload } from '../../../../utils/imageUpload'




export default function SetStudent({ data, role }) {
    const x = useRef()
    const y = useRef()
    const router = useNavigate()
    const [loading, setLoading] = useState(false)
    const [avatar, setAvatar] = useState()
    const [avatarArr, setAvatarArr] = useState(data?.images || [])
    const { register: register2, handleSubmit: handleSubmit2, setValue: setValue2, watch: watch2 } = useForm();


    const watchedFiles2 = watch2()

    useEffect(() => {
        setValue2("firstName", data?.firstName)
        setValue2("lastName", data?.lastName)
        setValue2("loginId", data?.loginId)
        setValue2('email', data?.email)
        setValue2('password', data?.password)
        setValue2('brithday', data?.brithday)
        setValue2('bio', data?.bio)
        setValue2("desc", data?.desc)
        setValue2("avatar", data?.avatar)
        setAvatar(data?.avatar)
        setAvatarArr(data?.images || [])
    }, [data])

    const AddDataSubmit = async (body) => {
        setLoading(true)


        await StudentsUpdate({ images: JSON.stringify(avatarArr), ...body }, data?.id)
            .then(res => {
                if (res?.data?.message) {
                    toast(res?.data?.message)
                } else if (res.status == 203) {
                    toast('student updated')
                    if (role == "decan") {
                        router(`/decan/students/${data?.id}`)
                    } else if (role == "student") {
                        router('/student/me')
                    }
                }
                setLoading(false)
            })
            .catch(err => {
                toast(err.response.data.message)
                setLoading(false)

            })
    }

    const hendleimg = async (e) => {
        if (e.target.files[0]) {
            const data = await ImageUpload(e.target.files[0])
            setValue2('avatar', data?.url)
            setAvatar(URL.createObjectURL(e.target.files[0]))
        }
    }


    const hendleimg2 = async (e) => {
        if (e.target.files[0]) {
            // setAvatarArr(statu => [...statu, newUrl])
            const formData = new FormData()
            formData.append("image", e.target.files[0])
            const data = await ImageUpload(e.target.files[0])
            setAvatarArr(state => [...state, data?.url])
        }
    }
    const deleteAvatar = async () => {
        await FileRemove({ url: data?.avatar })
        setValue2('avatar', ' ')
        setAvatar(null)
    }
    return (
        <Container className={cls.SetStudent__container}  >
            <form onSubmit={handleSubmit2(AddDataSubmit)}>
                <div className={cls.SetStudent__logout2__wrap} ref={x} onClick={(e) => {
                    if (e.target == x.current) {
                        x.current.classList.remove("displayBlock")
                    }
                }}>
                    <div className={cls.SetStudent__logout2} ref={y}>
                        <p className={cls.SetStudent__logout2__text}>
                            変更を保存せずに
                            終了しますか?
                        </p>
                        <div>
                            <CancelBtn onClick={() => {
                                router(-1)
                            }}>
                                はい
                            </CancelBtn>
                            <BlueButtun onClick={() => x.current.classList.remove("displayBlock")} style={{ paddingLeft: "30px" }} >いいえ</BlueButtun>
                        </div>
                    </div>
                </div>

                <div >
                    <div className={cls.SetStudent__top}>
                        <div className={cls.SetStudent__top__Info}>
                            <div onClick={() => x.current.classList.add("displayBlock")}>
                                <LeftIcon />
                                <p className={cls.SetStudent__top__role}>戻る</p>
                            </div>

                            <h3 className={cls.SetStudent__top__Name}>{data?.firstName} {data?.lastName}</h3>
                        </div>
                        <div className={cls.SetStudent__top__btns}>
                            <CancelBtn onClick={() => router(-1)}>
                                キャンセル
                            </CancelBtn>
                            <BlueButtun type={"submit"} style={{ padding: "14px 30px" }}>
                                更新を保存
                            </BlueButtun>
                        </div>
                    </div>
                    {
                        role == "decan" && <>

                            <div className={cls.SetStudent__inputs}>
                                <div className={cls.SetStudent__upload} >
                                    {avatar ?
                                        <div className={cls.SetStudent__upload__div}>

                                            < img
                                                src={avatar}
                                                width={150}
                                                height={150}
                                                alt="img"
                                            />
                                            <div className={cls.SetStudent__imgDelete} >
                                                <div onClick={() => deleteAvatar()}>
                                                    <BusketDeleteIcons2 />
                                                </div>
                                            </div>
                                        </div> : <Avatar name={data?.firstName} size="150" round={true} />
                                    }
                                    <label >
                                        <input className={cls.SetStudent__upload__file} accept="image/jpeg, image/png" type="file" onChange={(e) => hendleimg(e)} />
                                        <div className={cls.SetStudent__upload__icon}>  <UploadIcons /> </div>
                                    </label>
                                </div>
                                <div className={cls.SetStudent__content}>
                                    <AddInput
                                        className={cls.SetStudent__content__input}
                                        style={{ marginTop: "10px" }}
                                        type={"text"}
                                        label={"名前"}
                                        placeholder={"名前"}
                                        register={{ ...register2('firstName') }}
                                        value={watchedFiles2?.firstName || ''}
                                    />
                                    <AddInput
                                        className={cls.SetStudent__content__input}
                                        style={{ marginTop: "10px" }}
                                        type={"text"}
                                        label={"名字"}
                                        placeholder={"名字"}
                                        register={{ ...register2('lastName') }}
                                        value={watchedFiles2?.lastName || ''}
                                    />
                                    <AddInput
                                        className={cls.SetStudent__content__input}
                                        style={{ marginTop: "10px" }}
                                        type={"text"}
                                        label={"ID"}
                                        placeholder={"LoginID"}
                                        register={{ ...register2('loginId') }}
                                        disabled={true}
                                        value={watchedFiles2?.loginId || ''}
                                    />

                                    <AddInput
                                        className={cls.SetStudent__content__input}
                                        register={{ ...register2('brithday') }}
                                        type={"date"}
                                        label={"生年月日"}
                                        placeholder={"生年月日"}
                                        value={watchedFiles2?.brithday || ''}
                                        onChange={() => clearErrors("brithday")}
                                        style={{ marginTop: "10px" }}
                                    />
                                    <AddInput
                                        className={cls.SetStudent__content__input}
                                        style={{ marginTop: "10px" }}
                                        type={"text"}
                                        label={"電子メール"}
                                        placeholder={"電子メール"}
                                        value={watchedFiles2?.email || ''}
                                        onChange={() => clearErrors("email")}
                                        register={{ ...register2('email') }}
                                    />
                                    <AddInput
                                        className={cls.SetStudent__content__input}
                                        style={{ marginTop: "10px" }}
                                        type={"password"}
                                        label={"パスワード"}
                                        placeholder={"パスワード"}
                                        onChange={() => clearErrors("password")}
                                        register={{ ...register2('password') }}
                                    />
                                </div>
                            </div>
                        </>
                    }
                    <AddInput
                        style={{ marginTop: "10px", width: "100%" }}
                        type={"textarea"}
                        label={"自己紹介"}
                        value={["null", "undefined", null, undefined].includes(watchedFiles2?.bio) ? "bio" : watchedFiles2?.bio}
                        placeholder={"自己紹介"}
                        onChange={() => clearErrors("bio")}
                        register={{ ...register2('bio') }}
                    />

                </div>

                <div className={cls.SetStudent__wrap}>
                    <div className={cls.SetStudent__wrap__img}>
                        <p className={cls.SetStudent__wrap__text}>ギャラリー</p>
                        <div className={cls.SetStudent__wrap__img__box}>

                            <label>
                                <div>
                                    <GalaryIcons />
                                    <p>写真アップロード</p>
                                </div>
                                <input type="file" accept="image/jpeg, image/png" onChange={(e) => hendleimg2(e)} />
                            </label>
                            {
                                avatarArr && avatarArr.map((e, i) => (
                                    <div key={i} className={cls.SetStudent__wrap__cartume}>
                                        <img src={e} alt="img" />
                                        <div
                                            className={cls.SetStudent__wrap__cartume__div}
                                            onClick={async () => {

                                                await PhotoDeleteStudent(e)
                                                    .then(() => toast('photo deleted successfully'))
                                                    .catch(() => toast('failed to upload'))
                                                setAvatarArr(state => state.filter(el => el !== e))
                                            }}
                                        >
                                            <BusketDeleteIcons />
                                        </div>
                                    </div>
                                ))
                            }

                        </div>
                    </div>

                </div>
                <AddInput
                    style={{ marginTop: "10px", width: "100%" }}
                    type={"textarea"}
                    label={"概要"}
                    placeholder={"概要"}
                    value={["null", "undefined", null, undefined].includes(watchedFiles2?.desc) ? "Description" : watchedFiles2?.desc}
                    onChange={() => clearErrors("desc")}
                    register={{ ...register2('desc') }}
                />
            </form>
            <Toaster />
            {loading && <Loader onClick={() => setLoading(false)} />}

        </Container >
    )
}