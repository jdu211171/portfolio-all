import axios from "axios";

export const FileUpload = async (data) => { 
    const response = await axios.post(`${import.meta.env.VITE_API_STORE_URL}upload/image/`, data, {
        headers: {
            'Content-Type': "multipart/form-data",
    }},);
    return response;
}
export const FileRemove = async (body) => { 
    const response = await axios.delete(`${import.meta.env.VITE_API_STORE_URL}remove`,{data:body});
    return response;
}