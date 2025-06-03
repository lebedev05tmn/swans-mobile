import { Stack } from 'expo-router';
import { useFonts } from 'expo-font';
import LoadingPage from './loading';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

export default function RootLayout() {
    const [fontsLoaded] = useFonts({
        'MontserratAlternates-Bold': require('@/src/assets/fonts/MontserratAlternates-Bold.ttf'),
        'MontserratAlternates-Medium': require('@/src/assets/fonts/MontserratAlternates-Medium.ttf'),
        'MontserratAlternates-Regular': require('@/src/assets/fonts/MontserratAlternates-Regular.ttf'),
        'MontserratAlternates-SemiBold': require('@/src/assets/fonts/MontserratAlternates-SemiBold.ttf'),
        'Roboto-Medium': require('@/src/assets/fonts/Roboto-Medium.ttf'),
    });

    if (!fontsLoaded) {
        return <LoadingPage />;
    }

    const queryClient = new QueryClient();

    return (
        <QueryClientProvider client={queryClient}>
            <Stack
                screenOptions={{
                    headerShown: false,
                    navigationBarTranslucent: true,
                    navigationBarColor: 'transparent',
                    statusBarTranslucent: true,
                    statusBarBackgroundColor: 'transparent',
                    // statusBarStyle: 'dark',
                }}
            />
        </QueryClientProvider>
    );
}
