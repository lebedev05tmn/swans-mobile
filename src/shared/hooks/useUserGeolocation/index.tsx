import { useEffect } from 'react';
import * as Location from 'expo-location';
import createProfileStore from '@/src/shared/stores/createProfile/store';

const useUserLocation = () => {
    const setGeolocation = createProfileStore(
        (state) => state.actions.setGeolocation,
    );

    useEffect(() => {
        (async () => {
            try {
                // Запрашиваем разрешение на использование геолокации
                const { status } =
                    await Location.requestForegroundPermissionsAsync();
                if (status !== 'granted') {
                    console.log(
                        'Разрешение на доступ к геолокации не предоставлено',
                    );
                    return;
                }
                // Получаем текущую позицию
                const location = await Location.getCurrentPositionAsync({});
                const coords = [
                    location.coords.latitude,
                    location.coords.longitude,
                ];
                // Обновляем координаты в zustand‑store
                setGeolocation(coords);
            } catch (error) {
                console.error('Ошибка при получении геолокации:', error);
            }
        })();
    }, [setGeolocation]);
};

export default useUserLocation;