import axios from 'axios';

import { API_BASE_URL } from '@env'

export const api = axios.create({
    baseURL: API_BASE_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});
