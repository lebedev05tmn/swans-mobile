import { api } from './api';
import * as FileSystem from 'expo-file-system';

export const fetchMediaById = async (id: string) => {
    const response = await api.get(`/media/get/${id}`);
    return response.data;
};

export const uploadImage = async (imageUri: string) =>
    FileSystem.uploadAsync(api.defaults.baseURL + '/media/create', imageUri, {
        headers: {
            // Auth etc
        },
        uploadType: FileSystem.FileSystemUploadType.MULTIPART,
        fieldName: 'file',
        mimeType: 'image/png',
    });

export const uploadMedia = async (file: FormData) => {
    try {
        const response = await api.post('/media/create', file, {
            headers: { 'Content-Type': 'multipart/form-data' },
        });
        console.log(response);
        return response.data;
    } catch (error) {
        console.log(error);
    }
};

export const deleteMedia = async (id: string) => {
    const response = await api.delete(`/media/delete/${id}`);
    return response.data;
};
