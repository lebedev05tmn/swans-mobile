import React from 'react';
import {
    useFonts,
    MontserratAlternates_700Bold,
} from '@expo-google-fonts/montserrat-alternates';
import CreateProfilePage from '@/pages/CreateProfilePage/CreateProfile';

export default function HomeScreen() {
    const [loaded] = useFonts({
        MontserratAlternates_700Bold,
    });

    if (!loaded) {
        return null;
    }

    return <CreateProfilePage />;
}
