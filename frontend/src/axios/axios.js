import axios from "axios";

// Configuración global de axios
const api = axios.create({
    baseURL: 'http://localhost:8000',
    headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'X-Requested-With': 'XMLHttpRequest'
    },
    withCredentials: true
});

// Interceptor para obtener el token CSRF antes de cada petición POST/PUT/DELETE
api.interceptors.request.use(async (config) => {
    if (['post', 'put', 'delete'].includes(config.method)) {
        await axios.get('http://localhost:8000/sanctum/csrf-cookie');
    }
    return config;
});

export default api;