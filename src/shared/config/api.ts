import axios from 'axios';

const API_BASE_URL = process.env.API_BASE_URL;
const TEST_ACCESS_TOKEN = process.env.TEST_ACCESS_TOKEN;

const api = axios.create({
    baseURL: API_BASE_URL,
    headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${TEST_ACCESS_TOKEN}`,
    },
});

export default api;
