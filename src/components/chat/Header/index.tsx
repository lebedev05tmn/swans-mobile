import { FC } from 'react';
import { View } from 'react-native';
import styles from './style';
import BackButton from './BackButton';
import UserName from './UserName';

const Header: FC = () => {
    return (
        <View style={styles.header}>
            <BackButton />
            <UserName userName={'Константин'} confirmed={true} />
        </View>
    );
};

export default Header;
