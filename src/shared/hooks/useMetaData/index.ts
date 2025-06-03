import { useEffect, useState, useCallback } from 'react';
import * as Localization from 'expo-localization';
import * as Notifications from 'expo-notifications';
import * as Location from 'expo-location';

type TMetaData = {
    user_id: string;
    refresh_token: string;
    geolocation:
        | {
              x: number;
              y: number;
          }
        | 'denied';
    online: boolean;
    last_visit: string;
    verify: boolean;
    premium: boolean;
    super_likes: number;
    returns: number;
    background_mode: boolean | null;
    locale: string;
    banned: boolean;
    reported: number;
    socket_id: string;
    timezone: string;
    dating_last_time: string;
};

const useMetaData = () => {
    const [metaData, setMetaData] = useState<TMetaData | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const initMetaData = useCallback(async (): Promise<TMetaData> => {
        const initialData: TMetaData = {
            user_id: '123e4567-e89b-12d3-a456-426614174000',
            refresh_token: 'some_refresh_token',
            geolocation: 'denied',
            online: true,
            last_visit: new Date().toISOString(),
            verify: true,
            premium: false,
            super_likes: 5,
            returns: 2,
            banned: false,
            reported: 0,
            socket_id: '123e4567-e89b-12d3-a456-426614174000',
            dating_last_time: new Date().toISOString(),
            locale: 'ru-RU',
            timezone: 'Europe/Moscow',
            background_mode: false,
        };

        try {
            const locales = Localization.getLocales();

            if (locales.length > 0) {
                initialData.locale = locales[0].languageTag;
            }

            const calendars = Localization.getCalendars();

            if (calendars.length > 0 && calendars[0].timeZone) {
                initialData.timezone = calendars[0].timeZone;
            }
        } catch (e) {
            console.warn('Localization error:', e);
        }

        try {
            const { status } = await Notifications.getPermissionsAsync();

            if (status !== 'granted') {
                const { status: newStatus } =
                    await Notifications.requestPermissionsAsync();
                initialData.background_mode = newStatus === 'granted';
            } else {
                initialData.background_mode = true;
            }
        } catch (e) {
            console.warn('Notifications error:', e);
        }

        try {
            const { status } =
                await Location.requestForegroundPermissionsAsync();

            if (status === 'granted') {
                const position = await Location.getCurrentPositionAsync();
                initialData.geolocation = {
                    x: position.coords.latitude,
                    y: position.coords.longitude
                }
            }
        } catch (e) {
            console.warn('Location error:', e)
        }

        return initialData;
    }, []);

    useEffect(() => {
        const loadData = async () => {
            try {
                setIsLoading(true);
                setError(null);
                const data = await initMetaData();
                setMetaData(data);
            } catch (e) {
                console.error('MetaData init failed:', e);
                setError('Failed to initialize metadata');
            } finally {
                setIsLoading(false);
            }
        };

        loadData();
    }, [initMetaData]);

    const refresh = useCallback(async () => {
        try {
            setIsLoading(true);
            setError(null);
            const newData = await initMetaData();
            setMetaData(newData);
        } catch (e) {
            console.error('Refresh failed:', e);
            setError('Failed to refresh metadata');
        } finally {
            setIsLoading(false);
        }
    }, [initMetaData]);

    return {
        metaData,
        isLoading,
        error,
        refresh,
    };
};

export default useMetaData;
