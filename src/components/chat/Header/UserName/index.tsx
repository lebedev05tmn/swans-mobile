import { FC } from 'react';
import { Text, View } from 'react-native';
import ConfirmedUserIcon from '@/src/assets/svg/confirmedUserIcon.svg';
import styles from './style';

type TUserName = {
    userName: string;
    verified: boolean;
};

const UserName: FC<TUserName> = ({ userName, verified }) => {
    return (
        <View style={styles.wrap}>
            <Text style={styles.userName}>{userName}</Text>
            {verified && <ConfirmedUserIcon />}
        </View>
    );
};

export default UserName;
