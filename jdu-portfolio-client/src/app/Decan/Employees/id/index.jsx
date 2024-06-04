import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import OnePerson from "../../../../components/Pages/OnePerson";
import { RecruitorGetById } from "../../../../services/recruter";
import { TeacherGetById } from "../../../../services/teacher";


export default function DecanEmloyBuId({ role }) {

    const [data, setData] = useState()
    const param = useParams()
    useEffect(() => {
        const fetchData = async () => {
            const res = await TeacherGetById(param?.id);
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
                work={data?.specialisation != "undefined" ? data?.specialisation : null}
                bio={data?.bio}
                email={data?.email}
                section={data?.section}
                position={data?.position}
            />
        </>
    )
}