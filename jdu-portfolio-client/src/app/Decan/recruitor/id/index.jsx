import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import OnePerson from "../../../../components/Pages/OnePerson";
import { RecruitorGetById } from "../../../../services/recruter";


export default function DecanRecruitorBuId({ role }) {

    const [data, setData] = useState([])
    const param = useParams()
    useEffect(() => {
        const fetchData = async () => {
            const res = await RecruitorGetById(param?.id);
            setData(res)
        }
        fetchData()
            .then((err) => {
                console.log(err);
            })

    }, []);


    return (
        <div>
            <OnePerson
                avatar={data?.avatar}
                firstName={data?.firstName}
                lastName={data?.lastName}
                loginId={data?.loginId}
                work={data?.companyName}
                bio={data?.bio}
                email={data?.email}

            />
            {
                data?.bio && data.bio !== "undefined" ? <>
                    <div style={{ margin: "50px 0 16px 110px", fontSize: "16px", fontFamily: "Inter", fontWeight: "700" }}>
                        自己紹介
                    </div>
                    <p style={{ margin: "16px 0 16px 110px", width: "100%", maxWidth: "650px", fontSize: "14px", fontFamily: "Inter", fontWeight: "400" }}>
                        {data?.bio}
                    </p>
                </> : ""
            }
        </div >
    )
}