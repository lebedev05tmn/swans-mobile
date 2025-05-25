import Chats from '@/src/assets/svg/chatsTab.svg';
import Heart from '@/src/assets/svg/heartTab.svg';
import Profile from '@/src/assets/svg/profileTab.svg';
import Settings from '@/src/assets/svg/settingsTab.svg';
import SwansFill from '@/src/assets/svg/swansTabFill.svg';
import SwansUnfill from '@/src/assets/svg/swansTabUnfill.svg';
import { Tabs } from 'expo-router';
import { Pressable, View } from 'react-native';
import Animated, {
    useAnimatedStyle,
    useSharedValue,
    withSpring,
} from 'react-native-reanimated';

const NavigationLayout = () => {
    return (
        <>
            <View
                style={{
                    position: 'absolute',
                    height: 1,
                    backgroundColor: '#E0E0E0',
                    width: '93%',
                    left: '3.5%',
                    right: '3.5%',
                    bottom: 100,
                    zIndex: 100,
                }}
            />

            <Tabs
                screenOptions={{
                    headerShown: false,
                    tabBarShowLabel: false,
                    tabBarStyle: {
                        backgroundColor: '#fff',
                        height: 100,
                        display: 'flex',
                        flexDirection: 'row',
                        paddingBottom: 20,
                        borderTopWidth: 0,
                        shadowColor: '#FFFFFF',
                        paddingHorizontal: '6%',
                    },
                    tabBarButton: (props) => {
                        const scale = useSharedValue(1);

                        const animatedStyle = useAnimatedStyle(() => ({
                            transform: [{ scale: scale.value }],
                        }));

                        return (
                            <Pressable
                                onPressIn={() => {
                                    scale.value = withSpring(0.85, {
                                        damping: 8,
                                        stiffness: 500,
                                        mass: 0.3,
                                    });
                                }}
                                onPressOut={() => {
                                    scale.value = withSpring(1, {
                                        damping: 8,
                                        stiffness: 500,
                                        mass: 0.3,
                                    });
                                }}
                                onPress={props.onPress}
                                style={{ flex: 1 }}
                            >
                                <Animated.View
                                    style={[
                                        animatedStyle,
                                        {
                                            flex: 1,
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                        },
                                    ]}
                                >
                                    {props.children}
                                </Animated.View>
                            </Pressable>
                        );
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
                    name="dating"
                    options={{
                        tabBarIcon: ({ focused }) =>
                            focused ? <SwansFill /> : <SwansUnfill />,
                    }}
                />
                <Tabs.Screen
                    name="profile"
                    options={{
                        tabBarIcon: ({ focused }) => (
                            <Profile fill={focused ? '#60A0FF' : '#A3A3A3'} />
                        ),
                    }}
                />
                <Tabs.Screen
                    name="settings"
                    options={{
                        tabBarIcon: ({ focused }) => (
                            <Settings fill={focused ? '#60A0FF' : '#A3A3A3'} />
                        ),
                    }}
                />
            </Tabs>
        </>
    );
};

export default NavigationLayout;
