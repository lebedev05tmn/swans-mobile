import { Platform } from 'react-native';

let AppleAuthentication: any;

if (Platform.OS === 'ios') {
    try {
        AppleAuthentication = require('react-native-apple-authentication');
    } catch (error) {
        console.warn(
            '⚠️ Библиотека react-native-apple-authentication не найдена!',
        );
    }
}

export const handleAppleAuth = async () => {
    if (Platform.OS !== 'ios') {
        console.warn('⚠️ Apple Sign-In доступен только на iOS.');
        return;
    }

    if (!AppleAuthentication) {
        console.error(
            '❌ Ошибка: react-native-apple-authentication не установлена.',
        );
        return;
    }

    try {
        const response = await AppleAuthentication.signInAsync({
            requestedScopes: [
                AppleAuthentication.Scope.FULL_NAME,
                AppleAuthentication.Scope.EMAIL,
            ],
        });

        console.log('✅ Успешная аутентификация через Apple:', response);
    } catch (error: any) {
        console.error('❌ Ошибка аутентификации через Apple:', error);
    }
};
