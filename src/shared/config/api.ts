import axios from 'axios';

const API_BASE_URL = 'https://lebedev05tmn-swans-be-49ee.twc1.net/api';

export const api = axios.create({
    baseURL: API_BASE_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});
