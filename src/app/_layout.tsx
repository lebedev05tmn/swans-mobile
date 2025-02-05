import { Stack } from 'expo-router';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import {
    useFonts,
    MontserratAlternates_700Bold,
    MontserratAlternates_600SemiBold,
    MontserratAlternates_500Medium,
    MontserratAlternates_400Regular,
} from '@expo-google-fonts/montserrat-alternates';
import LoadingPage from '../pages/LoadingPage';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

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

    const queryClient = new QueryClient();

    return (
        <QueryClientProvider client={queryClient}>
            <GestureHandlerRootView style={{ flex: 1 }}>
                <Stack
                    screenOptions={{
                        headerShown: false,
                        navigationBarTranslucent: true,
                        navigationBarColor: 'transparent',
                        statusBarTranslucent: true,
                        statusBarBackgroundColor: 'transparent',
                        statusBarStyle: 'dark',
                    }}
                />
            </GestureHandlerRootView>
        </QueryClientProvider>
    );
}
