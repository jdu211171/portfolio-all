import toast, { Toaster } from 'react-hot-toast';
import { useForm } from 'react-hook-form'
import cls from './Login.module.scss'
import { useNavigate } from 'react-router-dom';
import ButtunLogin from '../../UL/buttun/loginButtun';
import LoginInput from '../../UL/input/loginInput';
import { Forget } from '../../../services/auth';
import { useState } from 'react';
import BlueButtun from '../../UL/buttun/blueBtn';
import Loader from '../../UL/loader';
export default function LogoutPage() {
    const [trueFalse, setIt] = useState(true)
    const router = useNavigate()
    const { register, handleSubmit, formState: { errors } } = useForm();
    const [loader, setLoader] = useState(false)
    const handleAuth = async (data) => {
        setLoader(true)
        await Forget(data)
            .then((response) => {
                setIt(false)
                setLoader(false)
            })
            .catch(error => {
                toast(error?.response?.data?.message)
                setLoader(false)
            })
    }
    if (trueFalse) {
        return (
            <div className={cls.Login}>
                <div className={cls.Login__content}>
                    <div>
                        <div className={cls.Login__content__top}>
                            <div>
                                <h3 className={cls.Login__content__title}>パスワードをお忘れの方</h3>
                                <p className={cls.Login__content__text}>パスワード更新リンクを電子メールに送信します</p>
                            </div>
                        </div>

                        <form className={cls.Form} onSubmit={handleSubmit(handleAuth)}>
                            <p className={cls.Form__idtext}>パスワードの変更</p>
                            <LoginInput
                                type={'text'}
                                placeholder={"電子メールアドレスを入力"}
                                style={{ backgroundImage: "url('/Image/icons/Iconsid.svg')", marginBottom: "50px" }}
                                alert={errors.email?.message}
                                register={{ ...register("email", { required: "電子メールは必要です！" }) }}
                            />
                            {/* <p className={cls.Form__forget} onClick={() => router('/auth/login')}>Back</p> */}
                            <ButtunLogin type='submit'>送信</ButtunLogin>
                        </form>
                    </div>
                </div>
                <div className={cls.Login__img}>

                </div>
                {loader && <Loader onClick={() => setLoader(false)} />}
            </div>
        )
    } else {
        return (
            <div className={cls.Login}>
                <div className={cls.Login__content}>
                    <div>
                        <div className={cls.Login__content__top}>
                            <div>
                                <h3 className={cls.Login__content__title}>更新リンクが送信されました。</h3>
                                <p className={cls.Login__content__text}>パスワードを更新するためのリンクを記載した電子メールを送信しました。</p>
                            </div>
                        </div>


                        <ButtunLogin style={{ marginTop: "82px" }} onChange={() => router('/auth/login')}>ログインへ戻る</ButtunLogin>

                    </div>
                </div>
                <div className={cls.Login__img}>

                </div>
            </div>
        )
    }
}
