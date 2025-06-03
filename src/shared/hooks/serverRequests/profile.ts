import * as SecureStore from 'expo-secure-store';

export type Profile = {
    user_name: string;
    birth_date: string;
    sex: string;
    images: string[];
    description: string;
    categories: string[];
    city: string;
};

export const getUserByToken = async (
    access_token: string,
): Promise<object | null> => {
    //Проверка есть ли пользователь по сохраненному токену
    const userData = SecureStore.getItem('user');
    if (userData) {
        const userDataParsed: Profile = JSON.parse(userData);
        const url = 'https://swans-dating.ru/api/profile/get';
        const response = await fetch(url, {
            method: 'GET',
            headers: {
                accept: 'application/json',
                Authorization: `Bearer ${access_token}`,
            },
        });
        if (response.ok) {
            return await response.json();
        } else {
            console.error(response.status);
            return null;
        }
    } else {
        return null;
    }
};
