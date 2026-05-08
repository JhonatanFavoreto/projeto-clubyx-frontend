import axios from 'axios';

const api = axios.create({
    // Coloque aqui a URL base de onde seu backend está rodando
    baseURL: 'http://localhost:3000',
});

export default api;
