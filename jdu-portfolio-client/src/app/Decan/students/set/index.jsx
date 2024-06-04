import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import SetStudent from "../../../../components/Pages/Decan/setStudent";
import { SpecialisationsGet } from "../../../../services/specialisations";
import { StudentsGetById } from "../../../../services/student";

export default function SetStudentpage({ role }) {
    const [Specialisation, setSpecialisation] = useState([])
    const [data, setData] = useState([])
    const param = useParams()

    useEffect(() => {
        const fetchData = async () => {
            const res = await StudentsGetById(param?.id);
            setData(res)
        }
        const fetchSpecialisations = async () => {
            const res = await SpecialisationsGet();
            setSpecialisation(res)
        }
        fetchData()
            .then((err) => {
                console.log(err);
            })
        fetchSpecialisations()
            .then((err) => {
                console.log(err);
            })

    }, []);
    return (
        <>
            <SetStudent data={data} Specialisation={Specialisation} role={role} />
        </>
    )
}