import { useRef, useState } from "react"
import DoteBtn from "../../buttun/doteBtn"
import ListModal from "../../madals/listMadal"
import cls from "./grouplist.module.scss"

export default function GroupList({ onClick, name, years, collection, students, update, remove }) {
  const [useId, setIseId] = useState()
  const x = useRef()
  const y = useRef()

  return (
    <div style={{ position: 'relative' }}
    >

      <ul className={cls.GroupList}
        onClick={(e) => {
          if (e.target != y.current) {
            onClick(e)
          }
        }}>
        <li >
          <div>{name}</div>
        </li>
        <li >{collection}</li>
        <li >{students}</li>
        <li >{years}</li>
        <DoteBtn ref={y} style={{ marginLeft: "auto" }} onClick={() => setIseId(true)} />
        <hr className={cls.GroupList__hr} />
      </ul>
      <div
        ref={x}
        onClick={e => {
          if (e.target == x.current) {
            setIseId(false)
          }
        }}
        style={useId ? { display: "flex" } : { display: "none" }}
        className={cls.backround}
      >
      </div>
      <ListModal
        onClick={onClick}
        remove={() => {
          setIseId(false)
          remove()
        }
        }
        update={() => {
          setIseId(false)
          update()
        }}
        style={useId ? { display: "block" } : { display: "none" }} />
    </div>

  )
}
