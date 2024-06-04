import api from "./api"

export const PriewExal = async (data) => {
    const response = await api.post('/excel', data, {
        headers: {
        "Content-Type":  "multipart/form-data"
    }} );
    return response;
}