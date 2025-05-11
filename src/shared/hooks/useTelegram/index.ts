import { Linking } from 'react-native';

const handleTelegramRedirect = async (url: string) => {
    const queryParams = new URLSearchParams(url.split('?')[1]);

    const userId = queryParams.get('user_id');
    const accessToken = queryParams.get('access_token');
    const refreshToken = queryParams.get('refresh_token');

    if (userId && accessToken && refreshToken) {
        try {
            console.log('User ID:', userId);
            console.log('Access Token:', accessToken);
            console.log('Refresh Token:', refreshToken);
        } catch (error) {
            console.error('Ошибка при обработке данных:', error);
        }
    } else {
        console.log('Отсутствуют необходимые параметры в ссылке');
    }
};

export const handleTelegramAuth = async () => {
    const botLink = `https://t.me/SwansAuthenticatorBot?start=auth`;
    const telegramAppUrl = `tg://resolve?domain=SwansAuthenticatorBot&start=auth`;

    try {
        const supported = await Linking.canOpenURL(telegramAppUrl);
        if (supported) {
            await Linking.openURL(telegramAppUrl);
        } else {
            await Linking.openURL(botLink);
        }
    } catch (err) {
        console.error('Ошибка открытия Telegram:', err);
        Linking.openURL(botLink);
    }
};

Linking.addEventListener('url', (event) => {
    handleTelegramRedirect(event.url);
});

Linking.getInitialURL().then((url) => {
    if (url) {
        handleTelegramRedirect(url);
    }
});
