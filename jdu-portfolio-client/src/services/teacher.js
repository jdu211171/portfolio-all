import api from "./api"

export const TeacherGet = async (query) => {
    try {
        const params = new URLSearchParams(query)
     const res = await api.get(`/teachers?${params.toString()}`, {withCredentials: true})
     return res.data
    } catch (error) {
     console.log(error.response.data.message);
    }
}

export const TeacherGetById = async (id) => {
    try {
     const res = await api.get(`/teacher/${id}`, {withCredentials: true})
     return res.data
    } catch (error) {
     console.log(error.response.data.message);
    }
}

 
export const TeacherAdd = async (data) => { 
    const response = await api.post('/teacher', data, {
        headers: {
        'Content-Type': "multipart/form-data"
    }});
    return response;
}
export const TeacherAllAdd = async (data) => { 
    const response = await api.post('/teachers', data, {
        headers: {
        'Content-Type': "multipart/form-data"
    }});
    return response;
}

export const TeacherUpdate = async ( data, id ) => { 
    const response = await api.put(`/teacher/${id}`, data, {
        headers: {
        'Content-Type': "multipart/form-data"
    }});
    return response;
}



export const Teacherdelete = async (id) => {
    try {
        const response = await api.delete(`/teacher/${id}`);
        return response;
       } catch (error) {
        console.log(error.response.data.message);
       }
}


export const SectionGet = async () => {
    try {

     const res = await api.get(`/section`, {withCredentials: true})
     return res.data
    } catch (error) {
     console.log(error.response.data.message);
    }
}


export const SectionGet2 = async () => {
    try {

     const res = await api.get(`/specialisations`, {withCredentials: true})
     return res.data
    } catch (error) {
     console.log(error.response.data.message);
    }
}
