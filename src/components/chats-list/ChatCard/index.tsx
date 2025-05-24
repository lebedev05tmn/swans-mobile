import Avatar from './Avatar';
import Header from './Header';
import LastMessage from './LastMessage';
import styles from './style';
import { View } from 'react-native';

const ChatCard = () => {
    return (
        <View style={styles.wrap}>
            <Avatar
                online={true}
                uri={'https://i.ytimg.com/vi/jg8ixdQzrjc/maxresdefault.jpg'}
            />
            <View style={styles.contentWrap}>
                <Header name={'Константин'} age={18} verify={true} />
                <LastMessage
                    unreadCount={5}
                    lastMessage={
                        'Вау, таких красоток мир еще не видел... Я помню чудное мгновенье'
                    }
                />
            </View>
        </View>
    );
};

export default ChatCard;
