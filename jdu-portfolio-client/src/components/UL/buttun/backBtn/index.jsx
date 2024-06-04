import { StudentsDounlowGet } from '../../../../services/student'
import { DownLoadIcon, LeftIcon } from '../../icons'
import cls from "./BackBtn.module.scss"

export default function BackBtn({ onClick, UserId, role, ...other }) {

    return (
        <div className={cls.BackBtn} {...other}>
            <div onClick={onClick}> <LeftIcon />戻る</div>

            {/* {role ? <label >
                <a href={`https://api.jdu.getter.uz/student/cv/${UserId}`} target="_blank" >
                    履歴書をダウンロード
                    <DownLoadIcon />
                </a>
            </label> : ""} */}
        </div>
    )
}
