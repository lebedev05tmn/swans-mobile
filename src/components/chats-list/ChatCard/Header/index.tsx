import { FC } from 'react';
import { Text, View } from 'react-native';
import styles from './style';
import ConfirmedUserIcon from '@/src/assets/svg/confirmedUserIcon.svg';

type THeader = {
    name: string;
    age: number;
    verify: boolean;
};

const Header: FC<THeader> = ({ name, age, verify }) => {
    return (
        <View style={styles.header}>
            <Text style={styles.name}>
                {name}, {age}
            </Text>
            {verify ? <ConfirmedUserIcon /> : null}
        </View>
    );
};

export default Header;
