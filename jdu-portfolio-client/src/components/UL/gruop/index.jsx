import RightAsideWrapper from '../Aside/RightAsideWrapper'
import cls from "./topStudents.module.scss"
// import { Student } from './data'
import TopStudentList from '../list/topStudent'
import { useNavigate, useSearchParams } from 'react-router-dom'
import ListModal from '../madals/listMadal'
import DoteBtn from '../buttun/doteBtn'
import { GruopPlusIcons } from '../icons'
import { useInView } from 'react-intersection-observer'
import { useInfiniteQuery } from 'react-query'
import { GruopGet, StudentarchiveGet } from '../../../services/gruop'
import { useEffect, useRef, useState } from 'react'
import paramsToObject from '../../../utils/paramsToObject.js'
export default function GruopList({ setGrupId1, decan, setGrupIdIm, fitchOnePerson1, fitchOnePerson, gruop = [], update, countGr, CreateGruop, count }) {
    const router = useNavigate()
    const { ref, inView } = useInView()
    const [params, setSearchParams] = useSearchParams()
    const [countArchiv, setCountArchiv] = useState()

    useEffect(() => {
        const fetchData = async () => {
            const res = await StudentarchiveGet();

            setCountArchiv(res?.count)
        }
        fetchData()
            .then((err) => {
                console.log(err)
            })

    }, [])
    const { data, isLoading: isNewsLoading, fetchNextPage, isFetchingNextPage, hasNextPage } = useInfiniteQuery(
        ['group'],
        async ({ pageParam = 1 }) => await GruopGet({
            limit: 30,
            page: pageParam,
            // lang: 'en'
        }) || {},
        {
            getNextPageParam: (lastPage, pages) => {
                return lastPage?.count > pages?.length * 30 ? pages.length + 1 : undefined
            }
        }

    )
    const group = data?.pages?.reduce((acc, page) => [...acc, ...page?.row], []) || []


    useEffect(() => {
        console.log(inView)
        if (inView && hasNextPage) {
            fetchNextPage()
        }
    }, [inView])
    const [useId, setIseId] = useState()
    const x = useRef()
    const y = useRef()

    return (
        <>
            <div
                className={`${cls.aside__shodow} ${params.get("onepgruop") == "true" ? cls.asiderClose : ""}`}
                onClick={() => { setSearchParams({ ...paramsToObject(params.entries()), onepgruop: false }) }}
            ></div>
            <div className={`${cls.aside} ${params.get("onepgruop") == "true" ? cls.asiderClose : ""}`} style={{ padding: "24px 20px 10px 24px", margin: "10px 0 0 0" }}>
                <div >
                    <div className={cls.TopStudents} >
                        <div className={cls.TopStudents__wrap}>
                            <h3 className={cls.TopStudents__title}>大学のグループ</h3>
                            <p className={cls.TopStudents__text}>以下で大学のグループを閲覧できます</p>
                        </div>
                        {decan && <div className={cls.TopStudents__btn} onClick={CreateGruop}><GruopPlusIcons /></div>}
                    </div>

                    <div className={cls.TopStudents__content}>


                        {group && group?.map(e => (
                            (
                                <div style={{ position: 'relative' }} key={e?.id}>

                                    <div className={`${cls.GruopList} ${e?.name == params.get('group') ? cls.GruopListactive : ""}`}>
                                        <div className={cls.GruopList__name} onClick={
                                            () => {
                                                setGrupIdIm(e?.id)
                                                setSearchParams({ ...paramsToObject(params.entries()), group: e?.name, onepgruop: false, isArchive: false })
                                            }}>{e?.name}</div>
                                        <div className={cls.GruopList__div} onClick={
                                            () => {
                                                setGrupIdIm(e?.id)
                                                setSearchParams({ ...paramsToObject(params.entries()), group: e?.name, onepgruop: false, isArchive: false })
                                            }}>
                                            <h3 className={cls.GruopList__title}>{e?.collection}</h3>
                                            <p className={cls.GruopList__student}>{e?.students}学生</p>
                                        </div>

                                        <DoteBtn style={{ margin: "0 0 0 auto" }} onClick={() => setIseId(e?.id)} />

                                    </div>

                                    <div ref={x}
                                        onClick={e => {
                                            if (e.target == x.current) {
                                                setIseId(false)
                                            }
                                        }}
                                        style={useId ? { display: "flex" } : { display: "none" }}
                                        className={cls.backround}
                                    >
                                    </div>
                                    {decan && <ListModal
                                        //   onClick={onClick}
                                        remove={() => {
                                            setIseId(false)
                                            fitchOnePerson1(e?.id)
                                            remove()
                                        }
                                        }
                                        update={() => {
                                            setIseId(false)
                                            update()
                                            setGrupId1(e?.id)
                                            fitchOnePerson(e?.id)
                                        }}
                                        style={useId == e?.id ? { display: "block" } : { display: "none" }} />}
                                </div>

                            )
                        ))
                        }

                        <div ref={ref} style={{ padding: "10px" }}></div>

                    </div>
                    {
                        decan == true &&

                        <div className={`${cls.GruopList} ${params.get('isArchive') == 'true' ? cls.GruopListactive : ""}`} onClick={() => {
                            setGrupIdIm(null)
                            setSearchParams({ ...paramsToObject(params.entries()), group: '', isArchive: true })

                        }}>
                            <div className={cls.GruopList__name}>Group</div>
                            <div className={cls.GruopList__div}>
                                <h3 className={cls.GruopList__title}>特別</h3>
                                <p className={cls.GruopList__student}>{countArchiv}学生</p>
                            </div>


                        </div>
                    }
                </div>


            </div>
        </>
    )
}
