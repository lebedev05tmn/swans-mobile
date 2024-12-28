import { useEffect } from 'react';
import { useRouter } from 'expo-router';

export default function HomeScreen() {
    const router = useRouter();

    useEffect(() => {
        setTimeout(() => {
            router.push('/create');
        }, 0);
    }, []);

    return null;
}
