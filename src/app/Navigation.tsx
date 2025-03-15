import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import Loading from '@screens/Loading';
import CreateProfile from '@screens/CreateProfile';
import { FC } from 'react';

const Stack = createNativeStackNavigator();

const Navigation: FC = () => {
    return (
        <NavigationContainer>
            <Stack.Navigator
                screenOptions={{
                    headerShown: false,
                    navigationBarTranslucent: true,
                    navigationBarColor: 'transparent',
                    statusBarTranslucent: true,
                    statusBarBackgroundColor: 'transparent',
                    statusBarStyle: 'dark',
                }}
                initialRouteName="CreateProfile"
            >
                <Stack.Screen name="Loading" component={Loading} />
                <Stack.Screen name="CreateProfile" component={CreateProfile} />
            </Stack.Navigator>
        </NavigationContainer>
    );
};

export default Navigation;
