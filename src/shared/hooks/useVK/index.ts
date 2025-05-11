import { Linking } from 'react-native';

const vkAppId = '53157922';
const vkRedirectUri = 'https://qieozjs-anonymous-8081.exp.direct/auth';
const vkClientSecret = '8MKmpXPQ8Tx576zJxO4j';

export const handleVKAuth = async () => {
    const authUrl = `https://oauth.vk.com/authorize?client_id=${vkAppId}&display=mobile&redirect_uri=${encodeURIComponent(vkRedirectUri)}&scope=profile,email&response_type=code&v=5.131`;
    Linking.openURL(authUrl);
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
            console.error(
                'Ошибка при получении токена доступа ВКонтакте:',
                error,
            );
        }
    } else {
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
        console.error(
            'Ошибка при регистрации пользователя через ВКонтакте:',
            error,
        );
    }
};
