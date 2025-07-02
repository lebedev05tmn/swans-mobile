import api from './api';

export const fetchProfile = async () => {
    const response = await api.get('/profile');
    return response.data;
};
