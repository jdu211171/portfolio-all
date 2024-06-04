import React from 'react'
import { MounthDay, WeekDay } from './data'

import cls from "./CalendarList.module.scss"

export default function CalendarList({...other}) {
  return (
    <div className={cls.CalendarList} {...other}>
          <ul className={cls.CalendarList__listTop}>
              {
                  WeekDay?.map(e => (
                    <li className={cls.CalendarList__listTop__item}>{ e?.title}</li>
                  ))
              }
          </ul>  
          <ul className={cls.CalendarList__list}>
              {
                  MounthDay?.map(e => (
                    <li className={cls.CalendarList__list__item}>{ e?.title}</li>
                  ))
              }
          </ul>  
    </div>
  )
}
