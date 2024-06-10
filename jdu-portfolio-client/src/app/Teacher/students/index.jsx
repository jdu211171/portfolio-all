import { useEffect, useState } from "react";
import { useInfiniteQuery, useQuery } from "react-query";
import { useParams, useSearchParams } from "react-router-dom";
import { useInView } from 'react-intersection-observer'


import StudentTeachPage from "../../../components/Pages/Teacher/Student";
import { GroupGetById } from "../../../services/gruop";
import { StudentsGet } from "../../../services/student";

export default function Teachertudent({ role }) {

  const { ref, inView } = useInView()
  const [params, setSearchParams] = useSearchParams()
  const param = useParams()

  const { data, isLoading: isNewsLoading, fetchNextPage, isFetchingNextPage, hasNextPage } = useInfiniteQuery(
    ['student', params.get('group'), params.get('groups'), params.get('jlpt'), params.get('jdu'), params.get('rate'), params.get('year'), params.get('search')],
    async ({ pageParam = 1 }) => await StudentsGet({
      limit: 15,
      page: pageParam,
      group: params.get('group') || '',
      groups: params.get('groups') || '',
      search: params.get('search') || '',
      jdu: params.get('jdu') || '',
      jlpt: params.get('jlpt') || '',
      rate: params.get('rate') || '',
      year: params.get('year') || '',
      isArchive: params.get('isArchive') || false,
    }) || {},
    {
      getNextPageParam: (lastPage, pages) => {

        return lastPage?.count > pages?.length * 15 ? pages.length + 1 : undefined
      }
    }
  )

  const students = data?.pages?.reduce((acc, page) => [...acc, ...page?.rows], []) || []

  useEffect(() => {
    if (inView && hasNextPage) {
      fetchNextPage()
    }
  }, [inView])
  return (
    <>
      <StudentTeachPage data={students} role={role} ref={ref} />
    </>
  )
}