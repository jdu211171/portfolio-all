import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { useInfiniteQuery, useQuery } from "react-query";
import { useInView } from 'react-intersection-observer'

import { RecruitorGet } from "../../../services/recruter";
import PerantPage from "../../../components/Pages/Decan/Parents";
import { ParentGet } from "../../../services/parent";

export default function DecParents() {
  const { ref, inView } = useInView()
  const [params, setSearchParams] = useSearchParams()
  const { data, isLoading: isNewsLoading, fetchNextPage, isFetchingNextPage, hasNextPage } = useInfiniteQuery(
    ['parent', params.get('search'), params.get('year'), params.get('groups')],
    async ({ pageParam = 1 }) => await ParentGet({
      limit: 15,
      page: pageParam,
      search: params.get('search') || '',
      year: params.get('year') || '',
      groups: params.get('groups') || '',
    }) || {},

    {
      getNextPageParam: (lastPage, pages) => {
        return lastPage?.count > pages?.length * 15 ? pages.length + 1 : undefined
      }
    }
  )
  const parents = data?.pages?.reduce((acc, page) => [...acc, ...page?.rows], []) || []

  useEffect(() => {
    if (inView && hasNextPage) {
      fetchNextPage()
    }
  }, [inView])

  return (
    <>
      <PerantPage data={parents} ref={ref} />
    </>
  )
}
