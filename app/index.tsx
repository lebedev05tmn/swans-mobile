import React from 'react';
import {
    useFonts,
    MontserratAlternates_700Bold,
} from '@expo-google-fonts/montserrat-alternates';
import LoadingPage from '../components/LoadingPage';

//30 строчка рендер шрифта, вместо текста склетон лоудер из глюстака

export default function HomeScreen() {
    const [loaded] = useFonts({
        MontserratAlternates_700Bold,
    });
    if (!loaded) {
        return null;
    }

    return <LoadingPage />
}


