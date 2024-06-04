import { TimePicker } from "antd";
import dayjs from 'dayjs';
import cls from './Timepicker.module.scss'

const Timepicker = ({
    label = '',
    onChange,
    rounded = true,
    value
}) => {
    const hours = new Date(value)?.getHours()
    const minutes = new Date(value)?.getMinutes()
    return (
        <div className={cls.timepicker}>
            <span className={cls.timepicker__label}>{label}</span>
            <TimePicker
                className={rounded ? cls.rounded : cls.square}
                format='HH:mm'
                onChange={onChange}
                {...{ [value !== undefined && value !== null && 'value']: dayjs(`${hours}:${minutes}`, 'HH:mm') }}
            />
        </div>
    );
}

export default Timepicker;