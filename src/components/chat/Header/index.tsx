import { FC } from 'react';
import { View } from 'react-native';
import styles from './style';
import BackButton from './BackButton';
import UserName from './UserName';
import Avatar from '@/src/shared/ui/Avatar';

type THeader = {
    userName: string;
    confirmed: boolean;
    online: boolean;
    avatarUri: string;
    avatarSize: number;
};

const Header: FC<THeader> = ({
    userName,
    confirmed,
    online,
    avatarUri,
    avatarSize,
}) => {
    return (
        <View style={styles.header}>
            <BackButton />
            <UserName userName={userName} confirmed={confirmed} />
            <Avatar online={online} uri={avatarUri} size={avatarSize} />
        </View>
    );
};

export default Header;
