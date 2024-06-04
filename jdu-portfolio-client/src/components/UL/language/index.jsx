import { useState } from "react"
import cls from "./Language.module.scss"

export default function Language({ language, onClick }) {
    const [id, setId] = useState(language[0]?.id)
    return (
        <div className={cls.Language}>
            {language?.map(e => (
                <p key={e.id} className={`${cls.Language__text} ${id == e?.id && cls.Language__textactive}`} onClick={() => {
                    setId(e?.id)
                    onClick(e)
                }}>{e.text}</p>
            ))
            }
        </div >
    )
}
