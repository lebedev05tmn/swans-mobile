import Header from '@/src/components/chat/Header';
import { FC } from 'react';
import { KeyboardAvoidingView, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import styles from './style';
import Footer from '@/src/components/chat/Footer';

const Chat: FC = () => {
    return (
        <View style={styles.container}>
            <SafeAreaView style={styles.container}>
                <KeyboardAvoidingView
                    behavior="padding"
                    style={styles.container}
                >
                    <Header
                        userName={'Константин'}
                        confirmed={true}
                        online={true}
                        avatarUri={
                            'https://i.pinimg.com/736x/df/ca/e5/dfcae5ca733809670f7a4897f304dadc.jpg'
                        }
                        avatarSize={36}
                    />
                    <View style={styles.chatBody}></View>
                    <Footer />
                </KeyboardAvoidingView>
            </SafeAreaView>
        </View>
    );
};

export default Chat;
