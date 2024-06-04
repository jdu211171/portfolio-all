import { useEffect, useState } from "react";
import { useInfiniteQuery, useQuery } from "react-query";
import { useSearchParams } from "react-router-dom";
import { useInView } from 'react-intersection-observer'

import { SpecialisationsGet } from "../../../services/specialisations";
import { StudentsGet } from "../../../services/student";
import StudentPage from "../../../components/Pages/Decan/Student";

export default function DecanStudent() {
  const { ref, inView } = useInView()
  const [params, setSearchParams] = useSearchParams()
  const { data: specialisation } = useQuery('specialisation', SpecialisationsGet)

  const { data, isLoading: isNewsLoading, fetchNextPage, isFetchingNextPage, hasNextPage } = useInfiniteQuery(
    ['student', params.get('group'), params.get('groups'), params.get('rate'), params.get('jdu'), params.get('jlpt'), params.get('year'), params.get('search')],
    async ({ pageParam = 1 }) => await StudentsGet({
      limit: 15,
      page: pageParam,
      group: params.get('group') || '',
      groups: params.get('groups') || '',
      jdu: params.get('jdu') || '',
      jlpt: params.get('jlpt') || '',
      search: params.get('search') || '',
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
      <StudentPage data={students} Specialisation={specialisation} ref={ref} />
    </>
  )
}