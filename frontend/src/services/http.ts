import 'dotenv/config';
import axios from 'axios'

axios.defaults.withCredentials = true;
axios.defaults.baseURL = process.env.SERVER_API_URL;

axios.interceptors.response.use(undefined, (error: any) => {
    const expectedError =
        error.response && error.response.status >= 400 && error.status < 500;

    if (!expectedError) {
        console.log('An unexpected error occured.');
    }

    return Promise.reject(error);
});

export default {
    get: axios.get,
    post: axios.post,
    put: axios.put,
    delete: axios.delete
};