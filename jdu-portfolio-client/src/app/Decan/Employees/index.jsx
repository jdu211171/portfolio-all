import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { useInfiniteQuery, useQuery } from "react-query";
import { useInView } from 'react-intersection-observer'
import TeacherPage from "../../../components/Pages/Decan/Teacher";
import { TeacherGet } from "../../../services/teacher";

export default function DecEmployees() {

  const { ref, inView } = useInView()
  const [params, setSearchParams] = useSearchParams()
  const { data, isLoading: isNewsLoading, fetchNextPage, isFetchingNextPage, hasNextPage } = useInfiniteQuery(
    ['teachers', params.get('search'), params.get('specialisation'), params.get('position'), params.get('role')],
    async ({ pageParam = 1 }) => await TeacherGet({
      limit: 15,
      page: pageParam,
      specialisation: params.get('specialisation') || '',
      position: params.get('position') || '',
      role: params.get('role') || '',
      search: params.get('search') || '',
      // lang: 'en'
    }) || {},

    {
      getNextPageParam: (lastPage, pages) => {

        return lastPage?.count > pages?.length * 15 ? pages.length + 1 : undefined
      }
    }
  )
  const teachers = data?.pages?.reduce((acc, page) => [...acc, ...page?.rows], []) || []


  useEffect(() => {

    if (inView && hasNextPage) {
      fetchNextPage()
    }
  }, [inView])

  return (

    <>
      <TeacherPage data={teachers} ref={ref} />
    </>
  )
}
