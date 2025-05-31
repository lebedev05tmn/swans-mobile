import * as SecureStore from 'expo-secure-store';
import { Buffer } from 'buffer';
import { response400, response500 } from './commonResponses';
import { Alert } from 'react-native';

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
    const response = await fetch(url, {
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

    switch (response.status) {
        case 200:
            const data = (await response.json()) as AuthResponse;
            await SecureStore.setItemAsync('user', JSON.stringify(data));
            break;
        case 400:
            response400(response.json);
            break;
        case 403:
            getTokenByServiceId(serviceId, serviceName);
            break;
        case 500:
            response500();
            break;
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
    switch (response.status) {
        case 200:
            const userData = (await response.json()) as {
                access_token: string;
                refresh_token: string;
            };
            await SecureStore.setItemAsync('user', JSON.stringify(userData));
            break;
        case 400:
            response400(response.json());
        case 404:
            Alert.alert('Ошибка при получении данных. Повторите попытку');
            console.error('404');
            break;
        case 500:
            response500();
    }
};
