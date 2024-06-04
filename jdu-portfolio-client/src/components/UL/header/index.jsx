import { useEffect, useState } from 'react'
import cls from "./header.module.scss"
import Avatar from 'react-avatar';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useTime } from '../../../hooks/useTime';
import paramsToObject from '../../../utils/paramsToObject';

export default function Header({ user }) {
    const tashkentTime = useTime()
    const [params, setSearchParams] = useSearchParams()
    const tokyoTime = useTime('Asia/Tokyo')
    const router = useNavigate()
    const [openSearch, setOpenSearch] = useState(false)
    params.get('sideBar')

    return (
        <>
            <header className={cls.Header}>
                <div className={cls.Header__Wrap}>
                    <h3 className={cls.Header__logo} onClick={() => router(`/${user?.role}/home`)}>JDUポートフォリオシステム</h3>
                    <div className={cls.Header__left}>
                        <input
                            className={`${cls.Header__search} ${cls.Header__searchnone}`}
                            value={params.get('search') ?? ''}
                            onChange={(e) => { setSearchParams({ ...paramsToObject(params.entries()), search: e.target.value || '' }) }}
                            type="text"
                            placeholder="検索"
                        />
                        <div className={cls.Header__clock}>
                            <div className={cls.Header__clock__japon}>
                                <p className={cls.Header__clock__title}>日本</p>
                                <p className={cls.Header__clock__text}>{tokyoTime}</p>
                            </div>
                            <div className={cls.Header__clock__center}>
                                <div className={cls.Header__clock__line}></div>
                                <img
                                    className={cls.Header__clock__img}
                                    src={"/Image/line.svg"}
                                    width={15}
                                    height={2}
                                    alt={"img"}
                                />
                                <div className={cls.Header__clock__line2}></div>
                            </div>
                            <div className={cls.Header__clock__japon}>
                                <p className={cls.Header__clock__title1}>ウズベキスタン</p>
                                <p className={cls.Header__clock__text1}>{tashkentTime}</p>
                            </div>
                        </div>
                        <div className={cls.Header__searchBtn} onClick={() => setOpenSearch(!openSearch)} >
                            <img src="/Image/icons/search.png" alt="img" />
                        </div>
                        <div
                            className={`${cls.Header__humberger} ${params.get('sideBar') == "true" ? cls.Header__humbergerOpen : ""}`}
                            onClick={() => {

                                if (params.get('sideBar') == "true") {
                                    setSearchParams({ ...paramsToObject(params.entries()), sideBar: false })
                                } else {
                                    setSearchParams({ ...paramsToObject(params.entries()), sideBar: true })

                                }
                            }}
                        >
                        </div>
                        <div className={cls.Header__profil} onClick={() => router('/settings')}>
                            {
                                user?.avatar ? <img
                                    className={cls.Header__profil__img}
                                    src={user?.avatar}
                                    width={44}
                                    height={44}
                                    alt={"img"}
                                /> : <Avatar name={`${user?.firstName} ${user?.lastName || ''}`} size="44" round={true} />
                            }
                            <div >
                                <p className={cls.Header__profil__name}>{user?.firstName} {user?.lastName || ""}</p>
                                <p className={cls.Header__profil__id}>ID: {user?.loginId}</p>
                            </div>
                        </div>
                    </div>
                </div>
                {
                    openSearch && <div className={cls.Header__openSearch}>
                        <input
                            className={cls.Header__search}
                            value={params.get('search') ?? ''}
                            onChange={(e) => { setSearchParams({ ...paramsToObject(params.entries()), search: e.target.value || '' }) }}
                            type="text"
                            placeholder="検索"
                        />
                    </div>
                }

                {
                    openSearch && <div className={cls.Header__openWindow} onClick={() => setOpenSearch(false)}></div>
                }
            </header>
        </>
    )
}
