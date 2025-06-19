import { useEffect, useState } from 'react';
import {
    Keyboard,
    Platform,
    View,
    LayoutAnimation,
    UIManager,
} from 'react-native';
import {
    SafeAreaView,
    useSafeAreaInsets,
} from 'react-native-safe-area-context';

import Header from '@/src/components/chat/Header';
import Footer from '@/src/components/chat/Footer';
import styles from './style';

if (
    Platform.OS === 'android' &&
    UIManager.setLayoutAnimationEnabledExperimental
) {
    UIManager.setLayoutAnimationEnabledExperimental(true);
}

const Chat: React.FC = () => {
    const [keyboardHeight, setKeyboardHeight] = useState(0);
    const insets = useSafeAreaInsets();

    useEffect(() => {
        const showSub = Keyboard.addListener('keyboardDidShow', (e) => {
            LayoutAnimation.configureNext(
                LayoutAnimation.Presets.easeInEaseOut,
            );
            setKeyboardHeight(e.endCoordinates.height);
        });

        const hideSub = Keyboard.addListener('keyboardDidHide', () => {
            LayoutAnimation.configureNext(
                LayoutAnimation.Presets.easeInEaseOut,
            );
            setKeyboardHeight(0);
        });

        return () => {
            showSub.remove();
            hideSub.remove();
        };
    }, []);

    return (
        <SafeAreaView style={styles.container}>
            <Header
                userName="Константин"
                confirmed
                online
                avatarUri="https://i.pinimg.com/736x/df/ca/e5/dfcae5ca733809670f7a4897f304dadc.jpg"
                avatarSize={36}
            />

            <View style={styles.chatBody} />

            <View
                style={{
                    paddingBottom: Math.max(insets.bottom, keyboardHeight - 74),
                }}
            >
                <Footer />
            </View>
        </SafeAreaView>
    );
};

export default Chat;
