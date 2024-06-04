
import Filter from '../../../UL/filter'
import BlueButtun from '../../../UL/buttun/blueBtn'
import cls from "./GroupsPage.module.scss"

import React, { useState } from 'react'
import { useLocation, useNavigate, useSearchParams } from 'react-router-dom'
import { PlusIcon } from '../../../UL/icons'
import GroupTopList from '../../../UL/list/groupTop'
import GroupList from '../../../UL/list/grouplist'
import AddMadal from '../../../UL/madals/AddMadal'
import AddInput from '../../../UL/input/AddInput'
import DeleteMadel from '../../../UL/madals/deleteModel'
import { useForm } from 'react-hook-form'
import { AddGroup, Groupdelete, GroupGetById, UpdateGroup } from '../../../../services/gruop'
import Loader from '../../../UL/loader'
import { useQueryClient } from 'react-query'
import toast, { Toaster } from 'react-hot-toast';
const Course = [
  {
    id: "First",
    name: "First"
  },
  {
    id: "Second",
    name: "Second"
  },
  {
    id: "Third",
    name: "Third"
  },
  {
    id: "Fourth",
    name: "Fourth"
  }
]

const GroupsPage = React.forwardRef(({ groups }, ref) => {
  const queryClient = useQueryClient()
  const [params] = useSearchParams()
  const [openMadal, setOpenMadal] = useState(false)
  const [avatar, setAvatar] = useState()
  const [groupId, setGruopId] = useState(false)
  const [groupId1, setGrupId1] = useState()
  const [year, setYears] = useState()
  const [loading, setLoading] = useState(false)

  const [oneGruop, setOneGruop] = useState()

  const router = useNavigate()
  const Lacation = useLocation()


  const { register, handleSubmit, reset, clearErrors, setError, setValue, watch, formState: { errors } } = useForm();
  const watchedFiles = watch()
  const query = Lacation?.search.split('?')?.[1]?.split('=')?.[1]



  const fitchOnePerson1 = (id) => {
    const fetchData = async () => {
      const res = await GroupGetById(id);
      setOneGruop(res)
    }
    fetchData()
      .then((err) => {
      })
  }

  const fitchOnePerson = (id) => {
    const fetchData = async () => {
      const res = await GroupGetById(id);
      setValue("name", res?.name)
      setValue("collection", res?.collection)
      setYears(res?.year)
    }
    fetchData()
      .then((err) => {
      })
  }

  const AddStudentFunc = async (data) => {
    setLoading(true)
    if (year) {
      if (query == "false") {
        await AddGroup({ year, ...data })
          .then(res => {
            if (res?.data?.message) {
              toast(res?.data?.message)

            } else if (res.status == 201) {
              toast('gruop created')
              setOpenMadal(false)

            }
            setLoading(false)
            queryClient.invalidateQueries(['group', params.get('search'), params.get('year')])


          })
          .catch(err => {
            setLoading(false)
          })
      } else if (query == "true") {
        await UpdateGroup({ year, ...data }, groupId1)
          .then(res => {

            if (res?.data?.message) {
              toast(res?.data?.message)

            } else if (res.status == 203) {
              toast('gruop update')
              setOpenMadal(false)

            }
            setLoading(false)
            queryClient.invalidateQueries(['group', params.get('search'), params.get('year')])

          })
          .catch(err => {
            setLoading(false)
          })
      }
    } else {
      setLoading(false)
      setError('year', { type: 'custom', message: "gruop year reqiured" })
    }

  }

  return (
    <div className={cls.GroupsPage}>
      <div className={cls.GroupsPage__filter}>
        <Filter page={'group'} />
        <BlueButtun light={true} onClick={() => {
          setOpenMadal(true)
          router('?updete=false')
          reset()
        }
        }>
          <PlusIcon />
          リクルーターを追加
        </BlueButtun>
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
              setGrupId1(group?.id)
              fitchOnePerson(group?.id)
            }}
            onClick={() =>
              router(`/decan/groups/students/${group?.id}`)
            }

          />
        )

        )
      }

      <div ref={ref} style={{ padding: "10px" }}></div>

      {openMadal &&
        <AddMadal
          role={`${query == 'true' ? "グループを変更" : "グループを追加"} `}
          OnSubmit={handleSubmit(AddStudentFunc)}
          closeMadal={() => {
            setOpenMadal(false)
            setYears()
            if (query == "fasle") {
              setAvatar(null)
            }
            reset()

          }}>
          <div className={cls.GroupsPage__addInputs}>
            <AddInput
              register={{ ...register('name', { required: "name is required" }) }}
              value={watchedFiles?.name || ''}
              type={"text"}
              label={"グループの名前"}
              placeholder={"グループの名前"}
              style={{ marginBottom: "10px" }}
              alert={errors.name?.message}
              onChange={() => clearErrors("name")}
            />
            <AddInput
              value={year}
              type={"select"}
              label={"学年"}
              placeholder={"学年"}
              Specialisation={Course}
              alert={errors.year?.message}
              style={{ marginBottom: "10px" }}
              onChange={(e) => setYears(e)}
            />
            <AddInput
              register={{ ...register('collection', { required: "collection is required" }) }}
              value={watchedFiles?.collection || ''}
              type={"text"}
              label={"学部"}
              placeholder={"学部"}
              style={{ marginBottom: "10px" }}
            />
          </div>
        </AddMadal>
      }
      {
        groupId && <DeleteMadel
          id={oneGruop?.year}
          name={oneGruop?.name}
          years={`${oneGruop?.students?.length} students`}
          role={'gruop'}
          remove={async () => {
            setLoading(true)
            await Groupdelete(oneGruop?.id)
              .then(data => {
                setGruopId(false)
                if (data) {
                  toast("リクレーターが削除されました")
                  setLoading(false)
                }
                setGrupId1(false)

                setLoading(false)
                queryClient.invalidateQueries(['group', params.get('search'), params.get('year')])

              }).catch(err => {
                toast(err)
                setLoading(false)

              })


          }}
          className={groupId ? cls.openMadal : ''}
          close={() => setGruopId(false)}
        />
      }

      {loading && <Loader onClick={() => setLoading(false)} />}
      <Toaster />
    </div>
  )
})

export default GroupsPage;
