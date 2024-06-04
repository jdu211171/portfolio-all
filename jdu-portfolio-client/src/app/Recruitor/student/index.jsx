import { useEffect, useState } from "react";
import { useInView } from "react-intersection-observer";
import { useInfiniteQuery } from "react-query";
import { useLocation, useSearchParams } from "react-router-dom";
import StudentsPage from "../../../components/Pages/Recruitor/StudentsPage";
import { StudentsGet, StudentsGetSearch } from "../../../services/student";

export default function RecStudent({ role }) {
  const { ref, inView } = useInView()
  const [params, setSearchParams] = useSearchParams()

  const { data, isLoading: isNewsLoading, fetchNextPage, isFetchingNextPage, hasNextPage } = useInfiniteQuery(
    ['student', params.get('group'), params.get('groups'), params.get('year'), params.get('jdu'), params.get('jlpt'), params.get('search')],
    async ({ pageParam = 1 }) => await StudentsGet({
      limit: 15,
      page: pageParam,
      group: params.get('group') || '',
      groups: params.get('groups') || '',
      jdu: params.get('jdu') || '',
      jlpt: params.get('jlpt') || '',
      search: params.get('search') || '',
      year: params.get('year') || ''
    }) || {},
    {
      getNextPageParam: (lastPage, pages) => {
        return lastPage?.count > pages?.length * 15 ? pages.length + 1 : undefined
      }
    }
  )
  const { data: data2 } = useInfiniteQuery(
    ['student'],
    async ({ pageParam = 1 }) => await StudentsGet({
      limit: 15,
      page: pageParam,
    }) || {},
    {
      getNextPageParam: (lastPage, pages) => {
        return lastPage?.count > pages?.length * 15 ? pages.length + 1 : undefined
      }
    }
  )


  let students2 = data2?.pages?.reduce((acc, page) => [...acc, ...page?.rows], []) || []
  let students = data?.pages?.reduce((acc, page) => [...acc, ...page?.rows], []) || []
  if (!params.get('group') && !params.get('groups') && !params.get('jdu') && !params.get('jlpt') && !params.get('year') && !params.get('search')) {
    students = null
  }

  useEffect(() => {
    if (inView && hasNextPage) {
      fetchNextPage()
    }
  }, [inView])


  return (
    <>
      <StudentsPage data={students} data2={students2} role={role} ref={ref} />
    </>
  )
}
