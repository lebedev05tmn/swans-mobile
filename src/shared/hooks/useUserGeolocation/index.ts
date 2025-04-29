import * as Location from 'expo-location';
import { useState } from 'react';

const useUserGeolocation = () => {
    const [hasPermission, setHasPermission] = useState<boolean | null>(null);

    const checkPermission = async () => {
        const { status } = await Location.getForegroundPermissionsAsync();
        setHasPermission(status === 'granted');
        return status === 'granted';
    };

    const requestPermission = async () => {
        const { status } = await Location.requestForegroundPermissionsAsync();
        const granted = status === 'granted';
        setHasPermission(granted);
        return granted;
    };

    return {
        hasPermission,
        checkPermission,
        requestPermission,
    };
};

export default useUserGeolocation;
