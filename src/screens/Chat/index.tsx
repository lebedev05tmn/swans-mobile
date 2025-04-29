import Header from '@/src/components/chat/Header';
import { FC } from 'react';
import { Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import styles from './style';
import PermissionModal from '@/src/shared/ui/PermissionModal';

const Chat: FC = () => {
    return (
        <SafeAreaView style={styles.container}>
            <Header />
            <PermissionModal />
            <Text>Chat</Text>
        </SafeAreaView>
    );
};

export default Chat;
