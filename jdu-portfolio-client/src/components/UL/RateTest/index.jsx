import { DownloadIcons } from '../icons'

import cls from "./rateTest.module.scss"

import { saveAs } from "file-saver";
export default function RateTest({ Listening, Reading, writing, title,level, text, file }) {


    const setColor = (e) => {
        if (e >= 80) {
            return "#98CDDE"
        }
        if (e >= 50) {
            return "#AEDDC3"
        }
        if (e < 50) {
            return "#EDE8B5"
        }
    }
    const saveFile = () => {
        saveAs(
            file,
            "example.pdf"
        );
    };


    return (
        <div className={cls.RateTest}>
            <div className={cls.RateTest__top}>
                <p className={cls.RateTest__title}>{title} { level}</p>
                <div className={cls.RateTest__top__line}></div>
                <p className={cls.RateTest__title}>{text}</p>
            </div>
            <div className={cls.RateTest__btn}>
                <div className={cls.RateTest__btn__wrap}>
                    <div className={cls.RateTest__btn__text} style={{ background: setColor(Listening) }}>{Listening}%</div>
                    <p className={cls.RateTest__text}>聴解</p>
                </div>
                <div className={cls.RateTest__btn__wrap}>
                    <div className={cls.RateTest__btn__text} style={{ background: setColor(Reading) }}>{Reading}%</div>
                    <p className={cls.RateTest__text}>読解</p>
                </div>
                <div className={cls.RateTest__btn__wrap}>
                    <div className={cls.RateTest__btn__text} style={{ background: setColor(writing) }}>{writing}%</div>
                    <p className={cls.RateTest__text}>筆記</p>
                </div>
                <div className={cls.RateTest__Download} onClick={saveFile}>
                    <p className={cls.RateTest__Download__text}>資格保存</p>
                    <DownloadIcons color={'white'} back={'#5627DC'} back2={'#5627DC'} />
                </div>

            </div>
        </div>
    )
}
