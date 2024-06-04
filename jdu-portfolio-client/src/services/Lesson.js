import api from "./api"



export const LessonsAdd = async (data,id) => { 
    const response = await api.post(`/lesson/result/${id}`, data);
    return response;
}
export const LessonsUpdate = async ( data, id ) => { 
    const response = await api.put(`/lesson/result/${id}`, data);
    return response;
}