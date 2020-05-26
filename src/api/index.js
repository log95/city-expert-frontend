import axios from 'axios';

const domainUrl = process.env.VUE_APP_BACKEND_BASE_URL;
const apiPrefix = 'api/v1/';

const api = axios.create({
    baseURL: domainUrl + apiPrefix,
    headers: {
        'Authorization': 'Bearer ' + localStorage.getItem('JWT_TOKEN'),
    },
});

export default api;