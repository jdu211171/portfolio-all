import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { useInfiniteQuery, useQuery } from "react-query";
import { useInView } from 'react-intersection-observer'

import RecruitorPage from "../../../components/Pages/Decan/Recrotuir";
import { RecruitorGet } from "../../../services/recruter";

export default function DecanRecruitor() {

  const { ref, inView } = useInView()
  const [params, setSearchParams] = useSearchParams()
  const { data, isLoading: isNewsLoading, fetchNextPage, isFetchingNextPage, hasNextPage } = useInfiniteQuery(
    ['recruiters', params.get('companyName'), params.get('search')],
    async ({ pageParam = 1 }) => await RecruitorGet({
      limit: 15,
      page: pageParam,
      company: params.get('companyName') || '',
      search: params.get('search') || '',
      // lang: 'en'
    }) || {},

    {
      getNextPageParam: (lastPage, pages) => {
        return lastPage?.count > pages?.length * 15 ? pages.length + 1 : undefined
      }
    }
  )
  const recruiters = data?.pages?.reduce((acc, page) => [...acc, ...page?.rows], []) || []

  useEffect(() => {
    if (inView && hasNextPage) {
      fetchNextPage()
    }
  }, [inView])

  return (
    <>
      <RecruitorPage data={recruiters} ref={ref} />
    </>
  )
}