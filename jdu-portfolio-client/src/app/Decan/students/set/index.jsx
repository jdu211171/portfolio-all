import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import SetStudent from "../../../../components/Pages/Decan/setStudent";

import { StudentsGetById } from "../../../../services/student";

export default function SetStudentpage({ role }) {
    const [data, setData] = useState([])
    const param = useParams()

    useEffect(() => {
        const fetchData = async () => {
            const res = await StudentsGetById(param?.id);
            setData(res)
        }
        fetchData()
            .then((err) => {
                console.log(err);
            })

    }, []);
    return (
        <>
            <SetStudent data={data}  role={role} />
        </>
    )
}