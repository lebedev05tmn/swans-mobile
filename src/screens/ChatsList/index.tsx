//import chatsList from '@/chatsList.json';
import Title from '@/src/components/chats-list/Title';
import { SafeAreaView } from 'react-native-safe-area-context';
import styles from './style';
import ChatCard from '@/src/components/chats-list/ChatCard';

//const chats = JSON.stringify(chatsList.data);

const ChatsList = () => {
    return (
        <SafeAreaView style={styles.container}>
            <Title text="Ваши чаты" />
            <ChatCard />
        </SafeAreaView>
    );
};

export default ChatsList;
