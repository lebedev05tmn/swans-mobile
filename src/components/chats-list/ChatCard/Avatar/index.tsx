import { FC } from 'react';
import styles from './style';
import { Image, View } from 'react-native';

type TAvatar = {
    online: boolean;
    uri: string;
};

const Avatar: FC<TAvatar> = ({ online, uri }) => {
    return (
        <View style={styles.wrap}>
            <Image
                style={styles.avatar}
                source={{
                    uri: uri,
                }}
            />
            {online ? <View style={styles.online}></View> : null}
        </View>
    );
};

export default Avatar;
