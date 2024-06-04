
import api from "./api"



export const GruopGet = async (query) => {
    try {
        const params = new URLSearchParams(query)
        const res = await api.get(`/group?${params.toString()}`, {withCredentials: true})
     return res.data
    } catch (error) {
     console.log(error.response.data.message)
    } 
}
export const StudentarchiveGet = async (query) => {
    try {
        const params = new URLSearchParams(query)
        const res = await api.get(`/students/archive`, {withCredentials: true})
     return res.data
    } catch (error) {
     console.log(error.response.data.message)
    } 
}

export const GroupGetById = async (id) => {
    try {
     const res = await api.get(`/group/${id}`, {withCredentials: true})
     return res.data
    } catch (error) {
     console.log(error.response.data.message);
    }
}
export const AddGroup = async (data) => { 
    const response = await api.post(`/group`, data);
    return response;
}

export const UpdateGroup = async ( data, id ) => { 
    const response = await api.put(`/group/${id}`, data, {
        headers: {
        'Content-Type': "multipart/form-data"
    }});
    return response;
}

export const Groupdelete = async (id) => {
    try {
        const response = await api.delete(`/group/${id}`);
        return response;
       } catch (error) {
        console.log(error.response.data.message);
       }
}
