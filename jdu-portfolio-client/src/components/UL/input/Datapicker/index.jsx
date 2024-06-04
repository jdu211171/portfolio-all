import { DatePicker } from 'antd';
import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';
dayjs.extend(customParseFormat);

import cls from './Datapicker.module.scss'

const Datapicker = ({
    label,
    onChange,
    value,
    rounded = true,
}) => {
    let date = new Date(value)?.getDate()
    let month = new Date(value)?.getMonth() + 1
    const year = new Date(value)?.getFullYear()

    date = date < 10 ? `0${date}` : date
    month = month < 10 ? `0${month}` : month

    return (
        <div className={cls.datapicker}>
            <span className={cls.datapicker__label}>{label}</span>
            <DatePicker
                className={rounded ? cls.rounded : cls.square}
                format='DD|MM|YYYY'
                onChange={onChange}
                {...{ [value !== undefined && value !== null && 'value']: dayjs(`${date}|${month}|${year}`, 'DD|MM|YYYY') }}
            />
        </div>
    );
}

export default Datapicker;