import api from "./api"

export const SpecialisationsGet = async () => {
    try {
     const res = await api.get('/specialisations', {withCredentials: true})
     return res.data
    } catch (error) {
     console.log(error.response.data.message);
    }
}

export const SpecialisationsAdd = async (data) => { 
    const response = await api.post('/specialisation', data, {
        headers: {
        'Content-Type': "multipart/form-data"
    }});
    return response;
}
export const SpecialisationsUpdate = async ( data, id ) => { 
    const response = await api.put(`/specialisation/${id}`, data, {
        headers: {
        'Content-Type': "multipart/form-data"
    }});
    return response;
}

export const Specialisationsdelete = async (id) => {
    try {
        const response = await api.delete(`/specialisation/${id}`);
        return response;
       } catch (error) {
        console.log(error.response.data.message);
       }
}