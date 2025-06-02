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
): Promise<boolean> => {
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
            return true;
        case 400:
            response400(await response.json());
            return false;
        case 403: //Если юзер уже зарегистрировался
            return await getTokenByServiceId(serviceId, serviceName);
        case 500:
            response500();
            return false;
        default:
            return false;
    }
};

export const getTokenByServiceId = async (
    serviceId: string,
    serviceName: string,
): Promise<boolean> => {
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
            service_user_id: serviceId,
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
            return true;
        case 400:
            response400(response.json());
            return false;
        case 404:
            Alert.alert('Ошибка при получении данных. Повторите попытку');
            console.error('404');
            return false;
        case 500:
            response500();
            return false;
        default:
            return false;
    }
};
