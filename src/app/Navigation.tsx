import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import Loading from '@screens/Loading';
import Authorization from '@screens/Authorization';
import CreateProfile from '@screens/CreateProfile';
import EmailRegistration from '@src/screens/EmailRegistration';
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
                initialRouteName="Authorization"
            >
                <Stack.Screen name="Authorization" component={Authorization} />
                <Stack.Screen name="Loading" component={Loading} />
                <Stack.Screen name="CreateProfile" component={CreateProfile} />
                <Stack.Screen
                    name="EmailRegistration"
                    component={EmailRegistration}
                    options={{
                        animation: 'slide_from_right', // Плавное появление справа
                        gestureEnabled: true, // Позволяет свайпом закрывать окно
                    }}
                />
            </Stack.Navigator>
        </NavigationContainer>
    );
};

export default Navigation;
