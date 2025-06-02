import { Alert, Linking } from 'react-native';

export const handleTelegramAuth = async () => {
    const botLink = String(process.env.EXPO_PUBLIC_BOT_LINK);
    const telegramAppUrl = String(process.env.EXPO_PUBLIC_TG_APP_URL);

    try {
        const supported = await Linking.canOpenURL(telegramAppUrl);
        if (supported) {
            await Linking.openURL(telegramAppUrl);
        } else {
            await Linking.openURL(botLink);
        }
    } catch (err) {
        Alert.alert('Ошибка открытия Telegram');
        console.error(err);
        Linking.openURL(botLink);
    }
};
