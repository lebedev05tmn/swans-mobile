import { router } from 'expo-router';
import { createUser, getUserByToken } from '../serverRequests/auth';

export default async function SuccessfulAuth(
    serviceId: string,
    serviceName: string,
) {
    let userProfile = await getUserByToken();
    if (userProfile) {
        console.log('Пользователь отправлен в матчмакинг');
        router.push('/matchmaking');
    } else {
        await createUser(serviceId, serviceName);
        router.push('/create');
    }
}
