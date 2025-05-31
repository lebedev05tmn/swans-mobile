import { router } from 'expo-router';
import { createUser } from '../serverRequests/auth';
import * as SecureStore from 'expo-secure-store';
import { getUserByToken } from '../serverRequests/profile';

export default async function SuccessfulAuth(
    serviceId: string,
    serviceName: string,
) {
    try {
        await createUser(serviceId, serviceName);
        router.push('/create');
    } catch (e: any) {
        const stored = await SecureStore.getItemAsync('user');
        const userInfo = stored
            ? (JSON.parse(stored) as {
                  user_id?: string;
                  access_token: string;
                  refresh_token: string;
              })
            : null;
        if (userInfo) {
            const access_token = userInfo.access_token;
            const userProfile = await getUserByToken(access_token);
            if (userProfile) {
                router.push('/matchmaking');
            } else {
                router.push('/registration');
            }
        }
    }
}
