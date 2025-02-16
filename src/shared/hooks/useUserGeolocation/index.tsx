import { useEffect } from 'react';
import * as Location from 'expo-location';
import createProfileStore from '@/src/shared/stores/useCreateProfileStore';

const useUserLocation = () => {
    const setGeolocation = createProfileStore(
        (state) => state.actions.setGeolocation,
    );

    useEffect(() => {
        (async () => {
            try {
                const { status } =
                    await Location.requestForegroundPermissionsAsync();

                if (status !== 'granted') {
                    console.log(
                        'Разрешение на доступ к геолокации не предоставлено',
                    );
                    return;
                }

                const location = await Location.getCurrentPositionAsync({});
                const coords = [
                    location.coords.latitude,
                    location.coords.longitude,
                ];

                setGeolocation(coords);
            } catch (error) {
                console.error('Ошибка при получении геолокации:', error);
            }
        })();
    }, [setGeolocation]);
};

export default useUserLocation;
