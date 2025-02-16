import axios from 'axios';

const API_BASE_URL = 'https://swans-dating.ru/api';

export const api = axios.create({
    baseURL: API_BASE_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});
