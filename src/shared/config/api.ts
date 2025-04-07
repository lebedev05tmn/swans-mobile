import axios from 'axios';

import { API_BASE_URL } from '@env';

export const api = axios.create({
    baseURL: 'https://swans-dating.ru',
    headers: {
        'Content-Type': 'application/json',
    },
});
