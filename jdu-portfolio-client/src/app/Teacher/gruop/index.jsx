import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { useInfiniteQuery, useQuery } from "react-query";
import { useInView } from 'react-intersection-observer'
import GroupsTechPage from "../../../components/Pages/Teacher/Groups";
import { GruopGet } from "../../../services/gruop";

export default function TecherGruop({ role }) {
    const { ref, inView } = useInView()
    const [params, setSearchParams] = useSearchParams()
    const { data, isLoading: isNewsLoading, fetchNextPage, isFetchingNextPage, hasNextPage } = useInfiniteQuery(
        ['group', params.get('search'), params.get('year')],
        async ({ pageParam = 1 }) => await GruopGet({
            limit: 15,
            page: pageParam,
            search: params.get('search') || '',
            year: params.get('year') || "",
            // lang: 'en'
        }) || {},

        {
            getNextPageParam: (lastPage, pages) => {
                return lastPage?.count > pages?.length * 15 ? pages.length + 1 : undefined
            }
        }
    )
    const group = data?.pages?.reduce((acc, page) => [...acc, ...page?.row], []) || []


    useEffect(() => {
        if (inView && hasNextPage) {
            fetchNextPage()
        }
    }, [inView])
    return (
        <>
            <GroupsTechPage groups={group} role={role} ref={ref} />
        </>
    )
}
