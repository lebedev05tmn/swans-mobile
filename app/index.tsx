import React from 'react';
import {
    useFonts,
    MontserratAlternates_700Bold,
    MontserratAlternates_600SemiBold,
    MontserratAlternates_500Medium,
    MontserratAlternates_400Regular,
} from '@expo-google-fonts/montserrat-alternates';
import CreateProfilePage from '@/src/pages/CreateProfilePage';
import Registration from '@/src/pages/RegistrationPage/index';

export default function HomeScreen() {
    const [loaded] = useFonts({
        MontserratAlternates_700Bold,
        MontserratAlternates_600SemiBold,
        MontserratAlternates_500Medium,
        MontserratAlternates_400Regular,
    });

    if (!loaded) {
        return null;
    }

    return <Registration />;
}
