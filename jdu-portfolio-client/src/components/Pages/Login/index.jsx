'use client'


import toast, { Toaster } from 'react-hot-toast';

import { useForm } from 'react-hook-form'

import cls from './Login.module.scss'
import { json, useNavigate } from 'react-router-dom';
import ButtunLogin from '../../UL/buttun/loginButtun';
import LoginInput from '../../UL/input/loginInput';
import { AuthLogin } from '../../../services/auth';
import { useEffect, useState } from 'react';
import { eyeCloseIcons, eyeOpenIcons } from '../../UL/icons';
import Loader from '../../UL/loader';
export default function LoginPage() {
    const { register, handleSubmit, setError, setValue, watch, formState: { errors } } = useForm();
    const watchedFiles = watch()
    const [check, setCheck] = useState(false)
    const [curPass, setcurPass] = useState('password')
    const [eyeicons, setEyeicons] = useState(true)
    const [loader, setLoader] = useState(false)

    const router = useNavigate()

    const handleAuth = async (data) => {
        setLoader(true)
        await AuthLogin({ remember: check, ...data })
            .then((response) => {
                setLoader(false)
                if (check) {
                    localStorage.setItem("myapp-loginId", watchedFiles?.loginId); localStorage.setItem("myapp-password", watchedFiles?.password)
                }
                router(`/${response?.data?.user?.role}/home`)
            })
            .catch(error => {
                setError('loginId', { type: 'custom', message: "IDまたはパスワードが間違っています" });
                setError('password', { type: 'custom', message: "IDまたはパスワードが間違っています" });
                setLoader(false)
            })
    }
    return (
        <div className={cls.Login}>
            <div className={cls.Login__content}>
                <div>
                    <div className={cls.Login__content__top}>
                        <img
                            src='/logo.svg'
                            width={70}
                            height={70}
                            alt='img'
                        />
                        <div>
                            <h3 className={cls.Login__content__title}>おかえりなさい</h3>
                            <p className={cls.Login__content__text}>情報を入力してください。</p></div>
                    </div>

                    <form className={cls.Form} onSubmit={handleSubmit(handleAuth)}>
                        <p className={cls.Form__idtext}>ログイン</p>
                        <LoginInput
                            type={'text'}
                            placeholder={"電子メール"}
                            style={{ backgroundImage: "url('/Image/icons/Iconsid.svg')", marginBottom: "40px" }}
                            register={{ ...register("loginId", { required: "ログインIDが必要です" }) }}
                            alert={errors.loginId?.message}
                            value={watchedFiles?.loginId || ''}

                        />
                        <LoginInput
                            type={curPass}
                            placeholder={"パスワードを入力してください"}
                            register={{ ...register("password", { required: "パスワードが必要です" }) }}
                            style={{ backgroundImage: "url('/Image/icons/Iconspas.svg')" }}
                            alert={errors.password?.message}
                            value={watchedFiles?.password || ''}
                            icon={eyeOpenIcons()}
                            icon2={eyeCloseIcons()}
                            eyeOpen={eyeicons}
                            eyeClick={(e) => {
                                setcurPass(state => state == "password" ? "text" : "password")
                                setEyeicons(!eyeicons)

                            }}

                        />
                        <div className={cls.Form__bottom}>
                            <label className={cls.Form__label} >
                                <input className={cls.Form__chechbox} type="checkbox" onChange={(e) => setCheck(!check)} />
                                入力情報保存
                            </label>
                            <p className={cls.Form__forget} onClick={() => router('/auth/logout')}>パスワードをお忘れの方</p>
                        </div>
                        <ButtunLogin type='submit'>ログイン</ButtunLogin>
                    </form>
                </div>
            </div>
            <div className={cls.Login__img}>

            </div>
            <Toaster />
            {loader && <Loader onClick={() => setLoader(false)} />}
        </div>
    )
}
