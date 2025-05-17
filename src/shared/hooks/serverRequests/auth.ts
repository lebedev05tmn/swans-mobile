import * as SecureStore from 'expo-secure-store';
import { Alert } from 'react-native';
import { Buffer } from 'buffer';

const CREDENTIALS = String(process.env.EXPO_PUBLIC_CREDENTIALS);
const credentialsBase64 = Buffer.from(CREDENTIALS).toString('base64');

type AuthResponse = {
    user_id: string;
    access_token: string;
    refresh_token: string;
};

export const createUser = async (
    serviceId: string,
    serviceName: string,
): Promise<void> => {
    const url = 'https://swans-dating.ru/api/auth/create_user';
    let response = await fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            accept: 'application/json',
            Authorization: `Basic ${credentialsBase64}`,
        },
        body: JSON.stringify({
            service_id: serviceId,
            service_name: serviceName,
        }),
    });
    if (response.ok) {
        const data = (await response.json()) as AuthResponse;
        await SecureStore.setItemAsync('user', JSON.stringify(data));
    } else if (response.status === 403) {
        getTokenByServiceId(serviceId, serviceName);
    } else {
        const errorText = await response.text();
        console.error(`${response.status}: ${errorText}`);
        if (response.status === 500) {
            Alert.alert('Сервис временно недоступен, повторите попытку позже');
        }
    }
};

export const getUserByToken = async (): Promise<object | null> => {
    //Проверка есть ли пользователь по сохраненному токену
    let userData = SecureStore.getItem('user');
    if (userData) {
        const userDataParsed: AuthResponse = JSON.parse(userData);
        const url = 'https://swans-dating.ru/api/profile/get';
        let response = await fetch(url, {
            method: 'GET',
            headers: {
                accept: 'application/json',
                Authorization: `Bearer ${userDataParsed.access_token}`,
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

export const getTokenByServiceId = async (
    serviceId: string,
    serviceName: string,
): Promise<void> => {
    await SecureStore.deleteItemAsync('user');
    const url = 'https://swans-dating.ru/api/auth/get_tokens';
    let response = await fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            accept: 'application/json',
            Authorization: `Basic ${credentialsBase64}`,
        },
        body: JSON.stringify({
            service_id: serviceId,
            service_name: serviceName,
        }),
    });
    const userData = await response.json();
    await SecureStore.setItemAsync('user', JSON.stringify(userData));
};
