import axios from 'axios';
import router from '../router'

const domainUrl = process.env.VUE_APP_BACKEND_BASE_URL;
const apiPrefix = 'api/v1/';

const api = axios.create({
    baseURL: domainUrl + apiPrefix,
    headers: {
        'Authorization': 'Bearer ' + localStorage.getItem('JWT_TOKEN'),
    },
});

// Login page if user is not authorized.
api.interceptors.response.use(
    response => {
        return response;
    },
    error => {
        if (error.response.status === 401 && error.response.config.url !== 'account/login/') {
            window.localStorage.removeItem('JWT_TOKEN');

            let loginPage = router.resolve({'name': 'LoginRegister'});
            window.location.href = loginPage.href;
        }

        // Instead of "return error" to able catch error.
        return Promise.reject(error);
    },
);

export default api;
