import * as AppleAuthentication from 'expo-apple-authentication';
import type { AppleAuthenticationCredential } from 'expo-apple-authentication';
import { Buffer } from 'buffer';
import { Alert } from 'react-native';
import { jwtDecode } from 'jwt-decode';
import * as SecureStore from 'expo-secure-store';
import * as Crypto from 'expo-crypto';
import { router } from 'expo-router';

type identityToken = {
    aud: string;
    exp: number;
    iat: number;
    sub: string; //Постоянно при каждом запросе
    c_hash: string;
    email: string;
    email_verified: boolean;
    is_private_email: boolean;
    auth_time: number;
    nonce_supported: boolean;
};

export const handleAppleAuth = async () => {
    let userId = await SecureStore.getItemAsync('appleAuth');

    handleFirstTimeLog();
};

const handleFirstTimeLog = async (): Promise<void> => {
    try {
        const credential = await AppleAuthentication.signInAsync({
            requestedScopes: [
                AppleAuthentication.AppleAuthenticationScope.FULL_NAME,
                AppleAuthentication.AppleAuthenticationScope.EMAIL,
            ],
        });

        if (credential['identityToken']) {
            const payload: identityToken = jwtDecode(
                credential['identityToken'],
            );
            const isProperResponse = await ifProperResponse(
                credential,
                payload,
            );
            if (isProperResponse) {
                SecureStore.setItemAsync('appleAuth', payload['sub']);
                goToCreateProfile();
            } else {
                throw new Error('INVALID_RESPONSE_FROM_APPLE');
            }
        } else {
            throw new Error('IDENTITY_TOKEN_MISSING');
        }
    } catch (e: any) {
        if (e.code !== 'ERR_REQUEST_CANCELED') {
            //ERR_REQUEST_CANCELED - состояние при нажатии крестика
            Alert.alert(
                'Ошибка при авторизации через Apple ID.\nПроверьте подключение к Интернету',
            );
        }
    }
};

/**
 * Apple возвращает authorizationCode для проверки достоверности получаемых файлов
 * @param credential Полный ответ от Apple
 * @param payload Расшифрованный JWT (identityToken)
 * @returns Возвразает boolean проверки
 */
const ifProperResponse = async (
    credential: AppleAuthenticationCredential,
    payload: identityToken,
): Promise<boolean> => {
    if (credential['user'] === payload['sub']) {
        const code = credential['authorizationCode'];
        if (code) {
            const hash = await Crypto.digestStringAsync(
                Crypto.CryptoDigestAlgorithm.SHA256,
                code,
                { encoding: Crypto.CryptoEncoding.BASE64 },
            );
            const hashBuffer = Buffer.from(hash, 'base64').slice(0, 16);
            const base64url = hashBuffer
                .toString('base64')
                .replace(/\+/g, '-')
                .replace(/\//g, '_')
                .replace(/=+$/, '');
            return base64url === payload['c_hash'];
        } else {
            return false;
        }
    } else {
        return false;
    }
};

const goToCreateProfile = () => {
    router.push('/create');
};
