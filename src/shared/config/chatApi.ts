import api from './api';

export const fetchChats = async () => {
    const response = await api.get('/chat/all-chats');
    return response;
};
