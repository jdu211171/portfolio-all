import api from "./api"

export const GetMe = async () => {
    const res = await api.get('/me')
    return res
}