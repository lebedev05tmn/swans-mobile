import { Buffer } from 'buffer';
import { response500, response400 } from './commonResponses';
import { Alert } from 'react-native';
import * as SecureStore from 'expo-secure-store';

const CREDENTIALS = String(process.env.EXPO_PUBLIC_CREDENTIALS);
const credentialsBase64 = Buffer.from(CREDENTIALS).toString('base64');

type EmailRegistrationParams =
    | { method: 'send_code'; email: string }
    | { method: 'verify_code'; email: string; code: string }
    | { method: 'create_user'; email: string; password: string };

export const emailRegistration = async (
    vars: EmailRegistrationParams,
): Promise<{ responseCode: number; status: boolean } | undefined> => {
    const url = 'https://swans-dating.ru/api/auth/email_registration';
    let params: {
        email: string;
        code?: string;
        password?: string;
    } = { email: vars.email };

    switch (vars.method) {
        case 'verify_code':
            if (vars.code) {
                Object.assign(params, { code: vars.code });
            } else {
                console.error('Code missing');
                throw new Error('CODE_MISSING');
            }
            break;
        case 'create_user':
            if (vars.password) {
                Object.assign(params, { password: vars.password });
            } else {
                console.error('Password missing');
                throw new Error('PASSWORD_MISSING');
            }
            break;
        case 'send_code':
            break;
    }

    const response = await fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            accept: 'application/json',
            Authorization: `Basic ${credentialsBase64}`,
        },
        body: JSON.stringify({
            jsonrpc: '2.0',
            method: vars.method,
            params,
            id: String(Date.now()),
        }),
    });
    switch (response.status) {
        case 200:
            const ServerResponse = (await response.json()) as {
                jsonrpc: string;
                result: {
                    access_token?: string;
                    refresh_token?: string;
                    success: boolean;
                };
                id: string;
            };
            console.log(ServerResponse);
            if (
                ServerResponse.result.access_token &&
                ServerResponse.result.refresh_token
            ) {
                await SecureStore.setItemAsync(
                    'user',
                    JSON.stringify({
                        access_token: ServerResponse.result.access_token,
                        refresh_token: ServerResponse.result.refresh_token,
                    }),
                );
            }
            return { responseCode: 200, status: ServerResponse.result.success };
        case 400:
            response500();
            break;
        case 403:
            return { responseCode: 403, status: false };
        case 500:
            response400(response.json());
            break;
    }
};

export const emailLogin = async (email: string, login: string) => {
    await SecureStore.deleteItemAsync('user');
    const url = 'https://swans-dating.ru/api/auth/get_tokens';
    const response = await fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            accept: 'application/json',
            Authorization: `Basic ${credentialsBase64}`,
        },
        body: JSON.stringify({
            service_user_id: `${email}:${login}`,
            service_name: 'App',
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
            response400(await response.json());
            return false;
        case 404:
            Alert.alert('Неверный логин или пароль');
            console.error('404');
            return false;
        case 500:
            response500();
            return false;
    }
};

export const sendNewPassword = async (email: string) => {
    const url = 'https://swans-dating.ru/api/auth/send_new_password';

    const response = await fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            accept: 'application/json',
            Authorization: `Basic ${credentialsBase64}`,
        },
        body: JSON.stringify({
            email,
        }),
    });

    switch (response.status) {
        case 200:
            return true;
        case 400:
            response400(response.json());
            break;
        case 404:
            // Функция, которая принимает данный запрос должна создавать надпись ошибки у пользователя, а не струячить алертами
            Alert.alert('Пользователя с такой почтой не существует');
            return false;
        case 500:
            response500();
            break;
    }
};
