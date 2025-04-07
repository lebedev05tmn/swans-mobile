// src/utils/telegramAuth.ts

import { Linking, Alert, Platform } from 'react-native';

// --- Функция для открытия Telegram ---
export const openTelegramForAuth = async () => {
    // Имя твоего бота (УБЕДИСЬ, ЧТО ПРАВИЛЬНОЕ)
    const botUsername = 'SwansAuthenticatorBot';
    // Параметр start, если твой бот его использует (опционально, но полезно)
    const startParam = 'react_native_auth'; // Используем понятный параметр

    // Формируем ссылки
    const botLink = `https://t.me/${botUsername}?start=${startParam}`;
    // tg:// схема - предпочтительный способ открыть приложение напрямую
    const telegramAppUrl = `tg://resolve?domain=${botUsername}&start=${startParam}`;

    try {
        // Проверяем, можем ли открыть tg:// ссылку
        const supported = await Linking.canOpenURL(telegramAppUrl);
        if (supported) {
            console.log('Пытаемся открыть Telegram через tg://');
            await Linking.openURL(telegramAppUrl);
        } else {
            // Если не можем, используем обычную https ссылку
            console.log('Не удалось открыть tg://, используем https:// ссылку');
            await Linking.openURL(botLink);
        }
    } catch (err) {
        console.error('Ошибка при попытке открыть Telegram:', err);
        // В случае любой ошибки, пытаемся открыть веб-ссылку как запасной вариант
        try {
            await Linking.openURL(botLink);
        } catch (fallbackError) {
            console.error(
                'Ошибка при открытии fallback https ссылки:',
                fallbackError,
            );
            Alert.alert(
                'Ошибка',
                'Не удалось открыть Telegram. Убедитесь, что он установлен, или попробуйте позже.',
            );
        }
    }
};
