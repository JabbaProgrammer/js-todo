import axios from 'axios'

const API_URL = `http://localhost:${process.env.REACT_APP_API_PORT}`;

const api = axios.create()

api.defaults.baseURL = API_URL;
api.interceptors.request.use((config) => {
    config.headers.Authorization = `Bearer ${localStorage.getItem('token')}`;
    return config;
})

export default api;