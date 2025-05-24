import * as Location from 'expo-location';

const useUserGeolocation = () => {
    const checkGeolocationPermission = async () => {
        const { status } = await Location.getForegroundPermissionsAsync();
        return status;
    };

    const requestGeolocationPermission = async () => {
        const { status } = await Location.requestForegroundPermissionsAsync();

        return status;
    };

    const getGeolocation = async () => {
        const { coords } = await Location.getCurrentPositionAsync();

        return coords;
    };

    return {
        checkGeolocationPermission,
        requestGeolocationPermission,
        getGeolocation,
    };
};

export default useUserGeolocation;
