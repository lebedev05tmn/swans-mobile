import * as AppleAuthentication from 'expo-apple-authentication';
import { Alert } from 'react-native';
import { jwtDecode } from 'jwt-decode'; //Apple возвращает JWT
import * as SecureStore from 'expo-secure-store';

export const handleAppleAuth = async () => {
    try {
        const credential = await AppleAuthentication.signInAsync({
            requestedScopes: [
                AppleAuthentication.AppleAuthenticationScope.FULL_NAME,
                AppleAuthentication.AppleAuthenticationScope.EMAIL,
            ],
        });
    } catch (e: any) {
        if (e.code !== 'ERR_REQUEST_CANCELED') {
            //ERR_REQUEST_CANCELED - состояние при нажатии крестика
            Alert.alert(
                'Ошибка при авторизации через Apple ID.\nПроверьте подключение к Интернету',
            );
        }
    }
};
