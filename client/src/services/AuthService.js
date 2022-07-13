import api from "../API"

export const registration = async (email, password) => {
    try {
        const response = await api.post('registration', {email: email, password: password})
        return response.data;
    }
    catch (error) {
        throw error;
    }   
}

export const login = async (email, password) => {
    try {
        const response = await api.post('login', {email: email, password: password})
        return response.data;
    }
    catch (error) {
        throw error;
    }
}