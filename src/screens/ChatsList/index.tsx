//import chatsList from '@/chatsList.json';
import Title from '@/src/components/chats-list/Title';
import { ActivityIndicator } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import styles from './style';

//const chats = JSON.stringify(chatsList.data);

const ChatsList = () => {
    return (
        <SafeAreaView style={styles.container}>
            <Title text="Ваши чаты" />
            <ActivityIndicator size={'large'} color={'#60A0FF'} />
        </SafeAreaView>
    );
};

export default ChatsList;
