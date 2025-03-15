import { FC } from 'react';
import Navigation from '@app/Navigation';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const queryClient = new QueryClient();

const App: FC = () => {
    return (
        <QueryClientProvider client={queryClient}>
            <GestureHandlerRootView>
                <Navigation />
            </GestureHandlerRootView>
        </QueryClientProvider>
    );
};

export default App;
