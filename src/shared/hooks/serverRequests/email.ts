import { Buffer } from 'buffer';
import { response500, response400 } from './commonResponses';
import { ServerResponse } from 'http';
import { Alert } from 'react-native';

const CREDENTIALS = String(process.env.EXPO_PUBLIC_CREDENTIALS);
const credentialsBase64 = Buffer.from(CREDENTIALS).toString('base64');

export const emailRegistration = async (
    method: 'send_code' | 'verify_code' | 'create_user',
    email: string,
    code?: string,
    password?: string,
): Promise<boolean | undefined> => {
    const url = 'https://swans-dating.ru/api/auth/email_registration';
    let params: {
        email: string;
        code?: string;
        password?: string;
    } = { email: email };

    switch (method) {
        case 'verify_code':
            if (code) {
                Object.assign(params, { code: code });
            } else {
                console.error('Code missing');
                throw new Error('CODE_MISSING');
            }
            break;
        case 'create_user':
            if (password) {
                Object.assign(params, { password: password });
            } else {
                console.error('Password missing');
                throw new Error('PASSWORD_MISSING');
            }
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
            method,
            params,
            id: String(Date.now()),
        }),
    });

    switch (response.status) {
        case 200:
            const ServerResponse = (await response.json()) as {
                jsonrpc: string;
                result: {
                    success: boolean;
                };
                id: string;
            };
            return ServerResponse['result']['success'];
            break;
        case 400:
            response500();
            break;
        case 500:
            response400(response.json());
            break;
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
    }
};
