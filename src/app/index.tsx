import { Redirect } from 'expo-router';
import Loading from '../screens/Loading';
import useMetaData from '../shared/hooks/useMetaData';
import { useEffect } from 'react';

export default function HomeScreen() {
    const { metaData, isLoading } = useMetaData();

    useEffect(() => {
        if (!isLoading) console.log(metaData);
    }, [metaData])

    return isLoading ? <Loading /> : <Redirect href="/chats" />;
}
