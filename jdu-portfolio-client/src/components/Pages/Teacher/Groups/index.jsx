
import Filter from '../../../UL/filter'
import BlueButtun from '../../../UL/buttun/blueBtn'
import cls from "./GroupsPage.module.scss"

import React, { useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import GroupTopList from '../../../UL/list/groupTop'
import GroupList from '../../../UL/list/grouplist'


const GroupsTechPage = React.forwardRef(({ groups, role }, ref) => {


  const router = useNavigate()
  const Lacation = useLocation()
  return (
    <div className={cls.GroupsPage}>
      <div className={cls.GroupsPage__filter}>
        <Filter page={'group'} />
      </div>
      <GroupTopList />


      {
        groups && groups.map(group => (
          <GroupList
            key={group?.id}
            remove={() => {
              setGruopId(group?.id)
              fitchOnePerson1(group?.id)
            }}
            name={group?.name}
            years={group?.year}
            collection={group?.collection}
            students={group?.students}
            update={() => {
              router('?updete=true')
              setOpenMadal(true)
              setGruopId(false)
              setGrupId1(e?.id)
            }}
            onClick={() => router(`/${role}/groups/students/${group?.id}`)}

          />
        )

        )
      }

    </div>
  )
})

export default GroupsTechPage;
