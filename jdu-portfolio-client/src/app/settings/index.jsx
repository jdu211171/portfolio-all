import { useEffect, useState } from "react";
import SettingsPage from "../../components/Pages/Settings";
import { GetMe } from "../../services/me";

export default function Settings() {
    const [data, setData] = useState([])
    useEffect(() => {
        const fetchData = async () => {
            const res = await GetMe();
            setData(res?.data)
        }
        fetchData()
            .then((err) => {
                console.log(err);
            })
    }, [])
    return (
        <>
            <SettingsPage data={data} />
        </>
    )
}
