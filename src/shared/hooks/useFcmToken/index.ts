import { useEffect, useState } from 'react';
import * as Notifications from 'expo-notifications';
import * as Device from 'expo-device';
import axios, { AxiosError } from 'axios';

// type TPushTokenPayload = {
//     token: string;
//     userId?: string;
//     platform: string | null;
// };

const useFcmToken = (userId?: string) => {
    const [fcmToken, setFcmToken] = useState<string | null>(null);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const getTokenAndSend = async () => {
            try {
                if (!Device.isDevice) {
                    setError(
                        'Push уведомления работают только на физических устройствах',
                    );
                    return;
                }

                const { status: existingStatus } =
                    await Notifications.getPermissionsAsync();
                let finalStatus = existingStatus;

                if (existingStatus !== 'granted') {
                    const { status } =
                        await Notifications.requestPermissionsAsync();
                    finalStatus = status;
                }

                if (finalStatus !== 'granted') {
                    setError(
                        'Не предоставлено разрешение на отправку уведомлений',
                    );
                    return;
                }

                const response = await Notifications.getDevicePushTokenAsync();
                const token = response.data;
                setFcmToken(token);

                // const payload: TPushTokenPayload = {
                //     token,
                //     userId,
                //     platform: Device.osName,
                // };

                // await axios.post(BACKEND_URL, payload);
            } catch (err: unknown) {
                if (axios.isAxiosError(err)) {
                    const axiosError = err as AxiosError;
                    setError(axiosError.message);
                } else if (err instanceof Error) {
                    setError(err.message);
                } else {
                    setError('Неизвестная ошибка');
                }
            }
        };

        getTokenAndSend();
    }, [userId]);

    return { fcmToken, error };
};

export default useFcmToken;
