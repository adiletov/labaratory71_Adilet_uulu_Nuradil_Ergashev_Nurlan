import axios from 'axios';

const axiosApi = axios.create({
    baseURL: 'https://my-fire-base-5a1a7.firebaseio.com'
});

export default axiosApi;