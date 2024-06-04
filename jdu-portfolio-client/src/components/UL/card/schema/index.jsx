import cls from "./schema.module.scss"

export default function SchemaCard() {
  return (
    <div className={cls.SchemaCard}>
          <h3 className={cls.SchemaCard__text}>日本語 自主教育</h3>
          <h2 className={cls.SchemaCard__title}>Yapon tili guruh darslari</h2>
          <p className={cls.SchemaCard__teacher}>Japparova Yulduz</p>
          <div className={cls.SchemaCard__btn}>
              <p className={cls.SchemaCard__btn__item}>WLU 123</p>
              <p className={cls.SchemaCard__btn__item}>09:00 - 10:15</p>
          </div>
    </div>
  )
}
