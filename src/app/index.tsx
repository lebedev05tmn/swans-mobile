import React from 'react';
import {
    useFonts,
    MontserratAlternates_700Bold,
    MontserratAlternates_600SemiBold,
    MontserratAlternates_500Medium,
    MontserratAlternates_400Regular,
} from '@expo-google-fonts/montserrat-alternates';
import CreateProfilePage from '@/src/pages/CreateProfilePage';
import LoadingPage from '@/src/pages/LoadingPage';

export default function HomeScreen() {
    const [loaded] = useFonts({
        MontserratAlternates_700Bold,
        MontserratAlternates_600SemiBold,
        MontserratAlternates_500Medium,
        MontserratAlternates_400Regular,
    });

    if (!loaded) {
        return <LoadingPage />;
    }

    return <CreateProfilePage />;
}
