import { api } from './api';

// Получить медиафайл по ID
export const fetchMediaById = async (id: string) => {
    const response = await api.get(`/media/get/${id}`);
    return response.data;
};

// Загрузить медиафайл
export const uploadMedia = async (file: FormData) => {
    const response = await api.post('/media/create', file, {
        headers: { 'Content-Type': 'multipart/form-data' },
    });
    return response.data;
};

// Удалить медиафайл
export const deleteMedia = async (id: string) => {
    const response = await api.delete(`/media/delete/${id}`);
    return response.data;
};
