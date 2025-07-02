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
import useChatStore from '@/src/shared/stores/useChatStore';

if (
    Platform.OS === 'android' &&
    UIManager.setLayoutAnimationEnabledExperimental
) {
    UIManager.setLayoutAnimationEnabledExperimental(true);
}

const Chat: React.FC = () => {
    const [keyboardHeight, setKeyboardHeight] = useState(0);
    const insets = useSafeAreaInsets();
    const userName = useChatStore((state) => state.metadata.name);
    const verifyStatus = useChatStore((state) => state.metadata.verify);
    const onlineStatus = useChatStore((state) => state.metadata.online);

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
                userName={userName ?? 'Аноним'}
                verified={verifyStatus ?? false}
                online={onlineStatus ?? false}
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
