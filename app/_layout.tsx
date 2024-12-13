import { Stack } from 'expo-router';

import '@/global.css';
import { GluestackUIProvider } from '@/components/ui/gluestack-ui-provider';


export default function RootLayout() {
    return (
        <GluestackUIProvider mode="light">
            <Stack
                screenOptions={{
                    headerShown: false,
                    navigationBarTranslucent: true,
                    navigationBarColor: 'transparent',
                    statusBarTranslucent: true,
                    statusBarBackgroundColor: 'transparent',
                    statusBarStyle:  'dark',
                }}
            ></Stack>
        </GluestackUIProvider>
    );
}
