import * as Localization from 'expo-localization';
import { Platform } from 'react-native';

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

export const useMetaData = () => {
    const metaData: TMetaData = {
        user_id: '123e4567-e89b-12d3-a456-426614174000',
        refresh_token: 'some_refresh_token',
        geolocation: {
            x: null,
            y: null,
        },
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
    };

    const getSafeLocale = (): string => {
        try {
            const locales = Localization.getLocales();
            if (locales.length > 0) {
                return locales[0].languageTag;
            }

            if ('locale' in Localization) {
                return (Localization as any).locale;
            }

            return 'en-US';
        } catch (error) {
            console.warn('Failed to get locale:', error);
            return 'en-US';
        }
    };

    const getSafeTimezone = (): string => {
        try {
            const calendars = Localization.getCalendars();
            if (calendars.length > 0 && calendars[0].timeZone) {
                return calendars[0].timeZone;
            }

            try {
                return Intl.DateTimeFormat().resolvedOptions().timeZone;
            } catch {
                return 'UTC';
            }
        } catch (error) {
            console.warn('Failed to get timezone:', error);
            return 'UTC';
        }
    };

    metaData.locale = getSafeLocale();
    metaData.timezone = getSafeTimezone();

    return metaData;
};
