import api from "./api"

export const ParentGet = async (query) => {
    try {
        const params = new URLSearchParams(query)
        const res = await api.get(`/parent?${params.toString()}`, {withCredentials: true})
     return res.data
    } catch (error) {
     console.log(error.response.data.message);
    }
}
export const ParentGetById = async (id) => {
    try {
     const res = await api.get(`/parent/${id}`, {withCredentials: true})
     return res.data
    } catch (error) {
     console.log(error.response.data.message);
    }
}
 
export const ParentAdd = async (data) => { 
    const response = await api.post('/parent', data, {
        headers: {
        'Content-Type': "multipart/form-data"
    }});
    return response;
}
export const ParentAllAdd = async (data) => { 
    const response = await api.post('/parents', data, {
        headers: {
        'Content-Type': "multipart/form-data"
    }});
    return response;
}
export const ParentUpdate = async ( data, id ) => { 
    const response = await api.put(`/parent/${id}`, data, {
        headers: {
        'Content-Type': "multipart/form-data"
    }});
    return response;
}

export const Parentdelete = async (id) => {
    try {
        const response = await api.delete(`/parent/${id}`);
        return response;
       } catch (error) {
        console.log(error.response.data.message);
       }
}
