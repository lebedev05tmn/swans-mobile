import { FC } from 'react';
import styles from './style';
import { Text, View } from 'react-native';

type TLastMessage = {
    lastMessage: string;
    unreadCount: number;
};

const LastMessage: FC<TLastMessage> = ({ unreadCount, lastMessage }) => {
    return (
        <View style={styles.wrap}>
            {unreadCount ? (
                <View style={styles.unreadCountWrap}>
                    <Text style={styles.unreadCount}>{unreadCount}</Text>
                </View>
            ) : null}
            <Text style={styles.lastMessage}>{lastMessage}</Text>
        </View>
    );
};

export default LastMessage;
