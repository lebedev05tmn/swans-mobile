import { Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import styles from './style';

const ChatsList = () => {
    return (
        <SafeAreaView style={styles.container}>
            <Text style={styles.title}>Ваши чаты</Text>
        </SafeAreaView>
    );
};

export default ChatsList;
