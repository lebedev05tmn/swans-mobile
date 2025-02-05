import { api } from './api';

// Получить все профили
export const fetchProfiles = async () => {
    const response = await api.get('/profile');
    return response.data;
};

// Получить профиль по ID
export const fetchProfileById = async (id: string) => {
    const response = await api.get(`/profile/get/${id}`);
    return response.data;
};

// Создать профиль
export const createProfile = async (userId: string) => {
    const response = await api.post(`/profile/create?user_id=${userId}`);
    return response.data;
};

// Обновить профиль
export const updateProfile = async (id: string, data: any) => {
    const response = await api.patch(`/profile/update?id=${id}`, data);
    return response.data;
};

// Удалить профиль
export const deleteProfile = async (id: string) => {
    const response = await api.delete(`/profile/delete/${id}`);
    return response.data;
};
