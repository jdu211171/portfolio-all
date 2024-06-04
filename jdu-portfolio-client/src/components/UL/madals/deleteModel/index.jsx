import BlueButtun from '../../buttun/blueBtn'
import Person from '../../person'

import React, { useEffect, useState } from 'react'
import { useRef } from 'react'
import cls from "./delete.module.scss"
import AddInput from '../../input/AddInput'
import { GruopGet, UpdateGroup } from '../../../../services/gruop'
import { useSearchParams } from 'react-router-dom'
import { StudentsUpdate } from '../../../../services/student'
import { useQueryClient } from 'react-query'

import toast, { Toaster } from 'react-hot-toast';

export default function DeleteMadel({ id, orginalId, defaultGruop, GroupChange, name, avater, years, progress, remove, className, role, close, ...other }) {
    const queryClient = useQueryClient()
    const x = useRef()
    const [data, setData] = useState([])
    const [gruopID, setGruopID] = useState(defaultGruop || "")
    const [params] = useSearchParams()
    useEffect(() => {
        if (GroupChange) {
            const fetchData = async () => {
                const res = await GruopGet();
                setData([{ id: 'null', name: "None" }, { id: "Archive", name: "Archive" }, ...res.row])
            }
            fetchData()
                .then((err) => {
                    console.log(err)
                })
        }
    }, [])

    const UpdateGroupFunc = async () => {
        const data = gruopID == 'Archive' ? { isArchive: true, groupId: "null" } : { isArchive: false, groupId: gruopID }
        await StudentsUpdate(data, orginalId)
            .then(res => {

                if (res?.data?.message) {
                    toast(res?.data?.message)
                } else if (res.status == 203) {
                    toast('changed gruop')
                }

                queryClient.invalidateQueries(['student', params.get('group'), params.get('groups'), params.get('rate'), params.get('year'), params.get('search')])
                queryClient.invalidateQueries(['group'])
            })
            .catch(err => {

            }).finally(() => {
                close()
            })
    }
    return (
        <div
            ref={x}
            className={`${cls.DeleteMadel} ${className}`}
            onClick={(e) => { if (e.target === x.current) { close() } }}
            {...other}>
            <div className={cls.DeleteMadel__wrap}>
                <h3 className={cls.DeleteMadel__top}>
                    {GroupChange ? "グループを変更 " : role == "student" ? "学生を削除" : role == "decan" ? "" : "ユーザーを削除"}
                </h3>
                <div className={cls.DeleteMadel__content}>
                    <Person name={name} year={years} role={role} avatar={avater} id={id} />
                    {
                        GroupChange ? <>
                            <h3 className={cls.Gruop__title}>
                                この学生のグループを変更しますか?
                            </h3>

                            <AddInput
                                type={"select"}
                                label={"グループを選択してください"}
                                Specialisation={data}
                                value={gruopID}
                                placeholder={"Choose group"}
                                onChange={(e) => setGruopID(e)}
                                style={{ marginBottom: "20px" }}
                            />
                        </> : <>
                            <h3 className={cls.DeleteMadel__agree}>
                                {role == "student" ? "この学生を削除しますか？" : role == "decan" ? "" : "このユーザーを削除しますか？"}
                            </h3>
                            <p p className={cls.DeleteMadel__text}>
                                {role === "student" ? "学生を削除すると、その学生はすぐに学生アーカイブに追加されます。" :
                                    role == "decan" ? "ユーザーを削除すると、そのリクルーターはすぐにリクルーターアーカイブに追加されます。"
                                        : ""
                                }
                            </p>
                        </>
                    }
                </div>
                <div className={cls.DeleteMadel__botton}>
                    <button className={cls.DeleteMadel__Cancel} onClick={close}>
                        キャンセル
                    </button>
                    <BlueButtun onClick={() => {

                        if (GroupChange) {

                            UpdateGroupFunc()

                        } else {
                            remove()
                        }
                    }} style={{ padding: "14px 30px" }}>
                        {GroupChange ? "変更" : "削除"}
                    </BlueButtun>
                </div>
            </div>
            <Toaster />
        </div >
    )
}
