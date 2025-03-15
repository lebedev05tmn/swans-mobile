import { useEffect, useState } from 'react';
import Geolocation from 'react-native-geolocation-service';
import { PermissionsAndroid, Platform } from 'react-native';

export type TCoordinates = [number, number] | null;

const useGeolocation = (): TCoordinates => {
    const [location, setLocation] = useState<TCoordinates>(null);

    useEffect(() => {
        const requestLocationPermission = async () => {
            let granted = false;

            if (Platform.OS === 'android') {
                granted = await PermissionsAndroid.request(
                    PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
                ).then(
                    (result) => result === PermissionsAndroid.RESULTS.GRANTED,
                );
            } else {
                granted = true;
            }

            if (granted) {
                Geolocation.getCurrentPosition(
                    (position) => {
                        setLocation([
                            position.coords.latitude,
                            position.coords.longitude,
                        ]);
                    },
                    (error) => {
                        console.warn('Ошибка получения геолокации:', error);
                        setLocation(null);
                    },
                    {
                        enableHighAccuracy: true,
                        timeout: 15000,
                        maximumAge: 0,
                    },
                );
            } else {
                console.warn('Разрешение на геолокацию отклонено');
                setLocation(null);
            }
        };

        requestLocationPermission();
    }, []);

    return location;
};

export default useGeolocation;
