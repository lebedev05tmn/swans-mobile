import { Stack } from 'expo-router';

const ChatLayout = () => {
    return (
        <Stack
            screenOptions={{
                headerShown: false,
                navigationBarTranslucent: false,
                navigationBarColor: '#fff',
                statusBarTranslucent: false,
                statusBarBackgroundColor: '#fff',
                statusBarStyle: 'dark',
            }}
        />
    );
};

export default ChatLayout;
