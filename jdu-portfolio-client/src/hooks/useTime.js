import { useEffect, useState } from "react";
import moment from "moment";
import 'moment-timezone';

export const useTime = (tz = 'Asia/Tashkent') => {
    const [time, setTime] = useState(moment().tz(tz).format('HH:mm'));

    useEffect(() => {
        const timer = setInterval(() => {
            setTime(moment().tz(tz).format('HH:mm'));
        }, 60 * 1000);
        return () => {
            clearInterval(timer);
        }
    }, []);

    return time
};