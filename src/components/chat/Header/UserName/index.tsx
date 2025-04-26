import { FC } from 'react';
import { Text, View } from 'react-native';
import ConfirmedUserIcon from '@/src/assets/svg/confirmedUserIcon.svg';
import styles from './style';

type TUserName = {
    userName: string;
    confirmed: boolean;
}

const UserName: FC<TUserName> = ({ userName, confirmed }) => {
    return (
        <View style={styles.wrap}>
            <Text style={styles.userName}>{userName}</Text>
            {confirmed && <ConfirmedUserIcon />}
        </View>
    );
};

export default UserName;
