import { Redirect } from 'expo-router';
import { useMetaData } from '../shared/hooks/useMetaData';

export default function HomeScreen() {
    console.log(useMetaData());

    return <Redirect href="/chat" />;
}
