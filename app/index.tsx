import React from 'react';
import {
    useFonts,
    MontserratAlternates_700Bold,
} from '@expo-google-fonts/montserrat-alternates';
import LoadingPage from '../pages/LoadingPage';

export default function HomeScreen() {
    const [loaded] = useFonts({
        MontserratAlternates_700Bold,
    });

    if (!loaded) {
        return null;
    }

    return <LoadingPage />;
}
