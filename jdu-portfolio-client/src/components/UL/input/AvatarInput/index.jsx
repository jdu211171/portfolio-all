'use client'


import { useState } from 'react'
import { UploadNewIcon } from '../../icons'
import cls from "./AvatarInput.module.scss"

export default function AvatarInput({ onChange, url, ...other }) {


    return (
        <div className={cls.AvatarInput}  {...other} >
            <label >
                <input type="file" accept="image/jpeg, image/png" alt='img' onChange={(e) => {
                    onChange(e)
                }
                } />
                <div className={`${cls.AvatarInput__avatar} ${url ? "" : cls.AvatarInput__marginTop}`}>
                    {url ? <img className={cls.AvatarInput__avatar__img} src={url} alt="img" /> : <>
                        <div>
                            <UploadNewIcon color={"#5627DC"} />
                            <p className={cls.AvatarInput__avatar__text}>アバター</p>
                        </div>
                    </>
                    }

                </div>
            </label>
            <p className={cls.AvatarInput__text}>画像のサイズは3x4で、524kb以内</p>
        </div>
    )
}
