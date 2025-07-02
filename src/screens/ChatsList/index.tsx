import chatsList from '@/chatsList.json';
import ChatCard from '@/src/components/chats-list/ChatCard';
import Title from '@/src/components/chats-list/Title';
import { fetchChats } from '@/src/shared/config/chatApi';
import useChatStore from '@/src/shared/stores/useChatStore';
import { FC } from 'react';
import { FlatList, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import styles from './style';

const chats = chatsList.data;
const TEST_ACCESS_TOKEN = process.env.TEST_ACCESS_TOKEN;

const ChatsList: FC = () => {
    const { connect } = useChatStore().actions;

    connect(TEST_ACCESS_TOKEN);
    fetchChats().then((response) => console.log(response));

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
