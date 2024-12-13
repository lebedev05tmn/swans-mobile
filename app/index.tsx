import React from 'react';
import {
    useFonts,
    MontserratAlternates_700Bold,
    MontserratAlternates_500Medium,
    MontserratAlternates_400Regular,
} from '@expo-google-fonts/montserrat-alternates';
import CreateProfilePage from '@/pages/CreateProfilePage/CreateProfile';

export default function HomeScreen() {
    const [loaded] = useFonts({
        MontserratAlternates_700Bold,
        MontserratAlternates_500Medium,
        MontserratAlternates_400Regular,
    });

    if (!loaded) {
        return null;
    }

    return <CreateProfilePage />;
}
