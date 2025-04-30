import axios from 'axios';

const { API_BASE_URL } = process.env;

export const api = axios.create({
    baseURL: API_BASE_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});
