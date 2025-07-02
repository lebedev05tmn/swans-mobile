import { FC } from 'react';
import { View } from 'react-native';
import styles from './style';
import BackButton from './BackButton';
import UserName from './UserName';
import Avatar from '@/src/shared/ui/Avatar';

type THeader = {
    userName: string;
    verified: boolean;
    online: boolean;
    avatarUri: string;
    avatarSize: number;
};

const Header: FC<THeader> = ({
    userName,
    verified,
    online,
    avatarUri,
    avatarSize,
}) => {
    return (
        <View style={styles.header}>
            <BackButton />
            <UserName userName={userName} verified={verified} />
            <Avatar online={online} uri={avatarUri} size={avatarSize} />
        </View>
    );
};

export default Header;
