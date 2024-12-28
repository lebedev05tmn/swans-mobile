import { Stack } from 'expo-router';
import {
    useFonts,
    MontserratAlternates_700Bold,
    MontserratAlternates_600SemiBold,
    MontserratAlternates_500Medium,
    MontserratAlternates_400Regular,
} from '@expo-google-fonts/montserrat-alternates';
import '@/global.css';
import LoadingPage from '../pages/LoadingPage';

export default function RootLayout() {
    const [fontsLoaded] = useFonts({
        MontserratAlternates_700Bold,
        MontserratAlternates_600SemiBold,
        MontserratAlternates_500Medium,
        MontserratAlternates_400Regular,
    });

     if (!fontsLoaded) {
         return <LoadingPage />;
     }

    return (
            <Stack
                screenOptions={{
                    headerShown: false,
                    navigationBarTranslucent: true,
                    navigationBarColor: 'transparent',
                    statusBarTranslucent: true,
                    statusBarBackgroundColor: 'transparent',
                    statusBarStyle: 'dark',
                }}
            ></Stack>
    );
}
