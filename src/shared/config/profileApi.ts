import { api } from './api';

export const fetchProfiles = async () => {
    const response = await api.get('/profile');
    return response.data;
};

export const fetchProfileById = async (id: string) => {
    const response = await api.get(`/profile/get/${id}`);
    return response.data;
};

export const createProfile = async (id: string) => {
    const response = await api.post(`/profile/create?user_id=${id}`);
    return response.data;
};

export const updateProfile = async (id: string, data: any) => {
    const response = await api.patch(`/profile/update?id=${id}`, data);
    return response.data;
};

export const deleteProfile = async (id: string) => {
    const response = await api.delete(`/profile/delete/${id}`);
    return response.data;
};
