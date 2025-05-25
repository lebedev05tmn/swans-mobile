import chatsList from '@/chatsList.json';
import Title from '@/src/components/chats-list/Title';
import { SafeAreaView } from 'react-native-safe-area-context';
import styles from './style';
import ChatCard from '@/src/components/chats-list/ChatCard';
import { FlatList, View } from 'react-native';

const chats = chatsList.data;

const ChatsList = () => {
    return (
        <SafeAreaView style={styles.container}>
            <Title text="Ваши чаты" />
            <View style={styles.flatListWrap}>
                <FlatList
                    data={chats}
                    keyExtractor={(item) => item.chat_id.toString()}
                    contentContainerStyle={styles.flatList}
                    renderItem={({ item }) => (
                        <ChatCard
                            name={item.name}
                            age={item.age}
                            profilePicture={item.profile_picture}
                            online={item.online}
                            verify={item.verify}
                            unreadCount={item.unread_count}
                            lastMessage={item.last_message_text}
                        />
                    )}
                />
            </View>
        </SafeAreaView>
    );
};

export default ChatsList;
