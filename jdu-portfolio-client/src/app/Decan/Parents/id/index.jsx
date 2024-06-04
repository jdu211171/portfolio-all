import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import OnePerson from "../../../../components/Pages/OnePerson";
import { ParentGetById } from "../../../../services/parent";


export default function DecanPerantBuId() {
    const [data, setData] = useState([])
    const param = useParams()
    useEffect(() => {
        const fetchData = async () => {
            const res = await ParentGetById(param?.id);
            setData(res)
        }
        fetchData()
            .then((err) => {
                console.log(err);
            })

    }, []);

    return (
        <>
            <OnePerson
                avatar={data?.avatar}
                firstName={data?.firstName}
                lastName={data?.lastName}
                loginId={data?.loginId}
                work={data?.specialisation}
                email={data?.email}
                student={data?.Students}
            />
        </>
    )
}