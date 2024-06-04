import { useState } from "react";
import { useParams } from "react-router-dom";
import OneStudent from "../../../../components/Pages/Student/OneStuden";
import { StudentsGetById } from "../../../../services/student";


export default function StudentById() {
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
            <OneStudent user={data} />
        </>
    )
}
