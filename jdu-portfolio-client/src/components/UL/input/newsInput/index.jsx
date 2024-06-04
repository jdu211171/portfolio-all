'use client'


import React, { useState } from 'react'
import { UploadNewIcon } from '../../icons'

import cls from "./newsInput.module.scss"

export default function NewsInput({ label, type, placeholder, alert, register = {}, img, value, url, onChange, ...other }) {

    return (
        <label className={`${cls.NewsInput} ${type == "file" ? cls.NewsInputFile : ""}`} {...other}>
            <p className={cls.NewsInput__label}>{label}</p>
            {
                type == "textarea" ?
                    <textarea className={`${cls.NewsInput__input} ${cls.NewsInput__textarae} ${alert && cls.alertBorder}`} placeholder={placeholder}  {...register} ></textarea>
                    :
                    type == "file" ?
                        <div className={`${cls.NewsInput__file} ${alert && cls.alertBorder}`}>
                            <input type="file" onChange={onChange} accept=" image/jpg" />
                            <div className={cls.NewsInput__file__top}>
                                {url ?
                                    <img className={cls.NewsInput__input__img} src={URL.createObjectURL(url)} alt="img" />
                                    : img ? <img className={cls.NewsInput__input__img} src={img} alt="img" /> :
                                        <p className={cls.NewsInput__file__imgtext}>画像無し</p>}
                            </div>
                            <div className={cls.NewsInput__file__btm}>
                                <div className={cls.NewsInput__file__blue}>
                                    <UploadNewIcon color={"white"} />
                                </div>
                                <div className={cls.NewsInput__file__content}>
                                    <h4 className={cls.NewsInput__file__title}>写真をアップする</h4>
                                    <p className={cls.NewsInput__file__text}>.jpg .png. tif</p>
                                </div>
                            </div>
                        </div> :
                        <input
                            className={`${cls.NewsInput__input} ${alert && cls.alertBorder}`}
                            type={type} placeholder={placeholder}
                            onChange={onChange}

                            {...register}
                        />
            }
            {alert ? <p className={cls.NewsInput__alert}>{alert}</p> : ""}
        </label >
    )
}
