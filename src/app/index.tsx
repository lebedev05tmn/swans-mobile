import { Redirect } from 'expo-router';
import useMetaData from '../shared/hooks/useMetaData';
import { useEffect } from 'react';

export default function HomeScreen() {
    const metaData = useMetaData();

    useEffect(() => {
        console.log('metaData:', metaData);
    }, [metaData]);

    return <Redirect href="/chat" />;
}
