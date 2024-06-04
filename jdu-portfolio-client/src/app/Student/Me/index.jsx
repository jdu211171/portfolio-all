import { useEffect, useState } from "react";
import OneStudent from "../../../components/Pages/Student/OneStuden";
import { StudentsGetById } from "../../../services/student";

export default function StudentMe({ user, role }) {
    const [data, setData] = useState([])


    useEffect(() => {
        const fetchData = async () => {
            const res = await StudentsGetById(user?.id);
            setData(res)
        }
        fetchData()
            .then((err) => {
                console.log(err);
            })

    }, []);
    return (
        <>
            <OneStudent user={data} role={role} />
        </>
    )
}
