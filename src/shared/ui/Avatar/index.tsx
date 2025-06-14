import { FC } from 'react';
import styles from './style';
import { Image, View } from 'react-native';

type TAvatar = {
    online: boolean;
    uri: string;
    size: number;
};

const Avatar: FC<TAvatar> = ({ online, uri, size }) => {
    return (
        <View style={styles.wrap}>
            <View style={[styles.avatar, { width: size, height: size }]}>
                <Image
                    style={styles.image}
                    source={{
                        uri: uri,
                    }}
                />
            </View>
            {online ? (
                <View
                    style={[
                        styles.online,
                        { width: size * 0.25, height: size * 0.25 },
                    ]}
                ></View>
            ) : null}
        </View>
    );
};

export default Avatar;
