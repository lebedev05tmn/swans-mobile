import { router, useLocalSearchParams } from 'expo-router';
import { Alert, Image } from 'react-native';
import { useEffect } from 'react';
import { createUser } from '../serverRequests/auth';

export default async function continueWithTg() {
    const { service_id, service_name } = useLocalSearchParams();

    useEffect(() => {
        const handleCreateUser = async () => {
            if (service_id && service_name) {
                if (
                    await createUser(
                        service_id as string,
                        service_name as string,
                    )
                ) {
                    router.push('/matchmaking');
                }
            }
        };

        handleCreateUser();
    }, [service_id, service_name]);

    return (
        <Image
            source={{
                uri: 'https://preview.redd.it/bro-is-not-mf-doom-v0-dw26nbi97ivb1.jpeg?width=541&format=pjpg&auto=webp&s=4a06c19b829abd93950159e80164e52fe2cc7c2e',
            }}
            style={{ width: 300, height: 300 }}
        />
    );
}
