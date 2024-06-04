'use client'


import toast, { Toaster } from 'react-hot-toast';

import { useForm } from 'react-hook-form'

import cls from './Login.module.scss'
import { useNavigate, useSearchParams } from 'react-router-dom';
import ButtunLogin from '../../UL/buttun/loginButtun';
import LoginInput from '../../UL/input/loginInput';
import { NewPassword } from '../../../services/auth';
import Loader from '../../UL/loader';
import { useState } from 'react';
export default function LoginNewPage() {
    const [params] = useSearchParams()
    const router = useNavigate()
    const [loader, setLoader] = useState(false)
    const { register, handleSubmit, formState: { errors } } = useForm();
    const handleNewAuth = async (data) => {
        setLoader(true)
        await NewPassword({ userId: params.get("id"), token: params.get("token"), ...data })
            .then((response) => {
                setLoader(false)
                router('/auth/login')
            })
            .catch(error => {
                setLoader(false)
                toast(error?.response?.data?.message)
            })
    }
    return (
        <div className={cls.Login}>
            <div className={cls.Login__content}>
                <div>
                    <div className={cls.Login__content__top}>
                        <div>
                            <h3 className={cls.Login__content__title}>新しいパスワードを作成</h3>
                        </div>
                    </div>

                    <form className={cls.Form} onSubmit={handleSubmit(handleNewAuth)}>
                        <LoginInput
                            type={'password'}
                            placeholder={"パスワード認証"}
                            style={{ marginBottom: "31px", paddingLeft: 0 }}
                            register={{ ...register("password", { required: "パスワードが必要です" }) }}
                            alert={errors.email?.message}
                        />
                        <ButtunLogin type='submit'>パスワードを変更</ButtunLogin>
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
