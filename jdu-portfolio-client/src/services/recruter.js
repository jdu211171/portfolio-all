import api from "./api"

export const RecruitorGet = async (query) => {
    try {
        const params = new URLSearchParams(query)
        const res = await api.get(`/recruitors?${params.toString()}`, {withCredentials: true})
     return res.data
    } catch (error) {
     console.log(error.response.data.message);
    }
}
export const RecruitorGetSearch = async (value) => {
    try {
     const res = await api.get(`/recruitors${value}`, {withCredentials: true})
     return res.data
    } catch (error) {
     console.log(error.response.data.message);
    }
}
export const RecruitorGetById = async (id) => {
    try {
     const res = await api.get(`/recruitor/${id}`, {withCredentials: true})
     return res.data
    } catch (error) {
     console.log(error.response.data.message);
    }
}
 
export const RecruitorAdd = async (data) => { 
    const response = await api.post('/recruitor', data, {
        headers: {
        'Content-Type': "multipart/form-data"
    }});
    return response;
}
export const RecruitorUpdate = async ( data, id ) => { 
    const response = await api.put(`/recruitor/${id}`, data, {
        headers: {
        'Content-Type': "multipart/form-data"
    }});
    return response;
}

export const StudentSelect = async (id) => { 
    const response = await api.post(`/recruitor/select_student/${id}`, {
        headers: {
        'Content-Type': "multipart/form-data"
    }});
    return response;
}

export const Recruitordelete = async (id) => {
    try {
        const response = await api.delete(`/recruitor/${id}`);
        return response;
       } catch (error) {
        console.log(error.response.data.message);
       }
}
export const StudentSelectDel = async (  id ) => { 
    const response = await api.delete(`/recruitor/remove_student/${id}`, {
        headers: {
        'Content-Type': "multipart/form-data"
    }});
    return response;
}