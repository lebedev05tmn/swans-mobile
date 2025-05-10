import { Tabs } from 'expo-router';
import Heart from '@/src/assets/svg/heartTab.svg';
import Chats from '@/src/assets/svg/chatsTab.svg';
import SwansFill from '@/src/assets/svg/swansTabFill.svg';
import SwansUnfill from '@/src/assets/svg/swansTabUnfill.svg';
import Profile from '@/src/assets/svg/profileTab.svg';
import Settings from '@/src/assets/svg/settingsTab.svg';

const NavigationLayout = () => {
    return (
        <Tabs
            screenOptions={{
                tabBarShowLabel: false,
                tabBarActiveTintColor: '#FF4C00',
                tabBarInactiveTintColor: '#A3A3A3',
                tabBarStyle: {
                    backgroundColor: '#fff',
                    height: 100,
                    paddingTop: 20,
                },
            }}
        >
            <Tabs.Screen
                name="likes"
                options={{
                    tabBarIcon: ({ focused }) => (
                        <Heart fill={focused ? '#FF4C00' : '#A3A3A3'} />
                    ),
                }}
            />
            <Tabs.Screen
                name="chats"
                options={{
                    tabBarIcon: ({ focused }) => (
                        <Chats fill={focused ? '#FF4C00' : '#A3A3A3'} />
                    ),
                }}
            />
            <Tabs.Screen
                name="swans"
                options={{
                    tabBarIcon: ({ focused }) =>
                        focused ? <SwansFill /> : <SwansUnfill />,
                }}
            />
            <Tabs.Screen
                name="profile"
                options={{
                    tabBarIcon: ({ focused }) => (
                        <Profile fill={focused ? '#FF4C00' : '#A3A3A3'} />
                    ),
                }}
            />
            <Tabs.Screen
                name="settings"
                options={{
                    tabBarIcon: ({ focused }) => (
                        <Settings fill={focused ? '#FF4C00' : '#A3A3A3'} />
                    ),
                }}
            />
        </Tabs>
    );
};

export default NavigationLayout;
