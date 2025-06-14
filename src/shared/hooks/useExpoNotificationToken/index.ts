import * as Notifications from 'expo-notifications';
import Constants from 'expo-constants';

const useExpoNotificationTokenAsync = async () => {
    try {
        const projectId =
            Constants?.expoConfig?.extra?.eas?.projectId ??
            Constants?.easConfig?.projectId;
        if (!projectId) {
            throw new Error('Project ID not found');
        }
        const token = (
            await Notifications.getExpoPushTokenAsync({
                projectId,
            })
        ).data;
        console.log(token);
    } catch (e) {
        console.error(e);
    }
};

export default useExpoNotificationTokenAsync;
