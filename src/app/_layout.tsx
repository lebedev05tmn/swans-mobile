import { Stack } from 'expo-router';
import {
    useFonts,
    MontserratAlternates_700Bold,
    MontserratAlternates_600SemiBold,
    MontserratAlternates_500Medium,
    MontserratAlternates_400Regular,
} from '@expo-google-fonts/montserrat-alternates';
import LoadingPage from '../screens/Loading';
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
            <Stack
                screenOptions={{
                    headerShown: false,
                    statusBarTranslucent: true,
                    statusBarStyle: 'dark',
                }}
            />
        </QueryClientProvider>
    );
}
