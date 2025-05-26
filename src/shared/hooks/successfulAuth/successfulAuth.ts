import { router } from 'expo-router';
import { createUser, getUserByToken } from '../serverRequests/auth';

export default async function SuccessfulAuth(
    serviceId: string,
    serviceName: string,
) {
    try {
        await createUser(serviceId, serviceName);
        router.push('/create');
    } catch (e: any) {
        let userProfile = await getUserByToken();
        if (userProfile) {
            router.push('/matchmaking');
        } else {
            throw new Error(e);
        }
    }
}
