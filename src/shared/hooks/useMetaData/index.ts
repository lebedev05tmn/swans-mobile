import { useEffect, useState } from 'react';
import * as Localization from 'expo-localization';
import * as Notifications from 'expo-notifications';

type TMetaData = {
    user_id: string;
    refresh_token: string;
    geolocation: {
        x: number | null;
        y: number | null;
    };
    online: boolean;
    last_visit: string;
    verify: boolean;
    premium: boolean;
    super_likes: number;
    returns: number;
    background_mode: boolean | null;
    locale: string | null;
    banned: boolean;
    reported: number;
    socket_id: string;
    timezone: string | null;
    dating_last_time: string;
};

const useMetaData = () => {
    const [metaData, setMetaData] = useState<TMetaData>({
        user_id: '123e4567-e89b-12d3-a456-426614174000',
        refresh_token: 'some_refresh_token',
        geolocation: { x: null, y: null },
        online: true,
        last_visit: '2023-01-01T12:00:00Z',
        verify: true,
        premium: false,
        super_likes: 5,
        returns: 2,
        background_mode: null,
        locale: null,
        banned: false,
        reported: 0,
        socket_id: '123e4567-e89b-12d3-a456-426614174000',
        timezone: null,
        dating_last_time: '2023-01-01T12:00:00Z',
    });

    useEffect(() => {
        const init = async () => {
            const getSafeLocale = () => {
                try {
                    const locales = Localization.getLocales();
                    if (locales.length > 0) return locales[0].languageTag;
                    if ('locale' in Localization)
                        return (Localization as any).locale;
                    return 'ru-RU';
                } catch {
                    return 'ru-RU';
                }
            };

            const getSafeTimezone = () => {
                try {
                    const calendars = Localization.getCalendars();
                    if (calendars.length > 0 && calendars[0].timeZone) {
                        return calendars[0].timeZone;
                    }
                    return (
                        Intl.DateTimeFormat().resolvedOptions().timeZone ??
                        'Europe/Moscow'
                    );
                } catch {
                    return 'Europe/Moscow';
                }
            };

            const registerForPushNotificationsAsync = async () => {
                const { status: existingStatus } =
                    await Notifications.getPermissionsAsync();
                let finalStatus = existingStatus;
                if (existingStatus !== 'granted') {
                    const { status } =
                        await Notifications.requestPermissionsAsync();
                    finalStatus = status;
                }
                return finalStatus === 'granted';
            };

            const background_mode = await registerForPushNotificationsAsync();

            setMetaData((prev) => ({
                ...prev,
                locale: getSafeLocale(),
                timezone: getSafeTimezone(),
                background_mode,
            }));
        };

        init();
    }, []);

    return metaData;
};

export default useMetaData