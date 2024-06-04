import api from "./api"

export const StudentsGet = async (query) => {
    try {
        const params = new URLSearchParams(query)
        const res = await api.get(`/students?${params.toString()}`, {withCredentials: true})
     return res.data
    } catch (error) {
     console.log(error.response.data.message)
    } 
}

export const StudentsGetByGrup = async (query,GruopId) => {
    try {
        const params = new URLSearchParams(query)
        const res = await api.get(`/studentsByGruopId/${GruopId}?${params.toString()}`, {withCredentials: true})
     return res.data
    } catch (error) {
     console.log(error.response.data.message)
    } 
}
export const StudentsGetSearch = async (value) => {
    try {
     const res = await api.get(`/students${value}`, {withCredentials: true})
     return res.data
    } catch (error) {
     console.log(error.response.data.message);
    }
}
export const TopStudentsGet = async () => {
    try {
     const res = await api.get('/students/top', {withCredentials: true})
     return res.data
    } catch (error) {
     console.log(error.response.data.message);
    }
}

export const StudentsGetById = async (id) => {
    try {
     const res = await api.get(`/student/${id}`, {withCredentials: true})
     return res.data
    } catch (error) {
     console.log(error.response.data.message);
    }
}

export const StudentsGetByloginId = async (id) => {
    try {
     const res = await api.get(`/studentBy/${id}`, {withCredentials: true})
     return res.data
    } catch (error) {
     console.log(error.response.data.message);
    }
}

export const GetSkills = async () => {
    try {
     const res = await api.get('/skills', {withCredentials: true})
     return res.data
    } catch (error) {
     console.log(error.response.data.message);
    }
}
export const StudentsAllAdd = async (data) => { 
    const response = await api.post('/students', data, {
        headers: {
        'Content-Type': "multipart/form-data"
    }});
    return response;
}
export const StudentsAdd = async (data) => { 
    const response = await api.post('/student', data, {
        headers: {
        'Content-Type': "multipart/form-data"
    }});
    return response;
}
export const StudentsUpdate = async ( data, id ) => { 
    const response = await api.put(`/student/${id}`, data);
    return response;
}

export const Studentsdelete = async (id) => {
    try {
        const response = await api.delete(`/student/${id}`);
        return response;
       } catch (error) {
        console.log(error.response.data.message);
       }
}
export const FileUploadStudent = async (data) => {
    try {
        const response = await api.post(`/upload`,data, {
            headers: {
            'Content-Type': "multipart/form-data"
        }});
        return response?.data;
       } catch (error) {
        console.log(error.response.data.message);
       }
}

export const PhotoDeleteStudent = async (url) => {
    try {
        const response = await api.delete(`/galary?url=${url}`);
        return response?.data;
       } catch (error) {
        console.log(error.response.data.message);
       }
}
export const  PhotoUploadStudent = async (data) => {
    try {
        const response = await api.post(`/galary`,data, {
            headers: {
            'Content-Type': "multipart/form-data"
        }});
        return response?.data;
       } catch (error) {
        console.log(error.response.data.message);
       }
}
export const StudentsDounlowGet = async (id) => {
    try {
     const res = await api.get(`/student/cv/${id}`, {withCredentials: true})
     return res.data
    } catch (error) {
     console.log(error.response.data.message);
    }
}

export const Studentscertificates = async (data) => {
    try {
     const res = await api.post(`/students/certificates`, data,{
        headers: {
        'Content-Type': "multipart/form-data"
    }})
     return res.data
    } catch (error) {
     console.log(error.response.data.message);
    }
}



