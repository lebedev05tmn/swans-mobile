import { FC } from 'react';
import Avatar from '@/src/shared/ui/Avatar';
import Header from './Header';
import LastMessage from './LastMessage';
import styles from './style';
import { Pressable, View } from 'react-native';
import useChatStore from '@/src/shared/stores/useChatStore';

type TChatCard = {
    name: string;
    age: number;
    profilePicture: string;
    online: boolean;
    verify: boolean;
    unreadCount: number;
    lastMessage: string;
};

const ChatCard: FC<TChatCard> = ({
    name,
    age,
    profilePicture,
    online,
    verify,
    unreadCount,
    lastMessage,
}) => {
    const { joinChat } = useChatStore().actions;

    const handlePress = () => {
        joinChat(3);
    };

    return (
        <Pressable onPress={handlePress}>
            <View style={styles.wrap}>
                <Avatar online={online} uri={profilePicture} size={64} />
                <View style={styles.contentWrap}>
                    <Header name={name} age={age} verify={verify} />
                    <LastMessage
                        unreadCount={unreadCount}
                        lastMessage={lastMessage}
                    />
                </View>
            </View>
        </Pressable>
    );
};

export default ChatCard;
