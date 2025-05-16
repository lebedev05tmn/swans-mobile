import { Alert, Linking } from 'react-native';
import * as AuthSession from 'expo-auth-session';

const vkAppId = String(process.env.EXPO_PUBLIC_VK_APP_ID);
const vkRedirectUri = AuthSession.makeRedirectUri({
    scheme: 'swans',
    path: 'auth',
});
const vkClientSecret = String(process.env.EXPO_PUBLIC_VK_CLIENT_SECRET);

export const handleVKAuth = async () => {
    console.log(vkRedirectUri);
    const authUrl = `https://oauth.vk.com/authorize?client_id=${vkAppId}&display=mobile&redirect_uri=${encodeURIComponent(vkRedirectUri)}&scope=profile,email&response_type=code&v=5.131`;
    Linking.openURL(authUrl);
    Linking.addEventListener('url', verifyVKAuth);
};

export const verifyVKAuth = async (queryParams: Record<string, string>) => {
    const { code } = queryParams;
    if (code) {
        try {
            const response = await fetch(
                `https://oauth.vk.com/access_token?client_id=${vkAppId}&client_secret=${vkClientSecret}&redirect_uri=${encodeURIComponent(vkRedirectUri)}&code=${code}`,
            );
            const data = await response.json();
            console.log('Ответ от ВКонтакте:', data);

            if (data.error) {
                Alert.alert('Ошибка при авторизацию через VK');
                console.error('Ошибка от ВКонтакте:', data.error);
                return;
            }

            const { user_id, access_token, email } = data;
            if (user_id && access_token) {
                console.log('Получены данные пользователя:', {
                    user_id,
                    access_token,
                    email,
                });

                registerUser('ВКонтакте', user_id, access_token, email);
            } else {
                console.error('Не удалось получить данные пользователя');
            }
        } catch (error) {
            Alert.alert('Ошибка при авторизацию через VK');
            console.error(
                'Ошибка при получении токена доступа ВКонтакте:',
                error,
            );
        }
    } else {
        Alert.alert('Ошибка при авторизации через VK');
        console.error('Код авторизации не найден');
    }
};

const registerUser = async (
    serviceName: string,
    userId: string,
    accessToken: string,
    email: string | undefined,
) => {
    try {
        const response = await fetch(
            'https://swans-dating.ru/api/auth/create_user',
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    service_name: serviceName,
                    service_user_id: userId,
                    access_token: accessToken,
                    email: email,
                }),
            },
        );

        const data = await response.json();
        if (data.user_id) {
            console.log('Пользователь успешно зарегистрирован:', data);
        } else {
            console.log('Ошибка регистрации пользователя:', data.message);
        }
    } catch (error) {
        Alert.alert('Ошибка при авторизацию через VK');
        console.error(
            'Ошибка при регистрации пользователя через ВКонтакте:',
            error,
        );
    }
};
