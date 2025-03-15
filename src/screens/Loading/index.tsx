import SwansLogo from '@assets/svg/swans.svg';
import { FC } from 'react';
import LinearGradient from 'react-native-linear-gradient';
import { SafeAreaView } from 'react-native-safe-area-context';
import styles from './style';

const Loading: FC = () => {
    return (
        <LinearGradient
            colors={['#B18FCF', '#87CEEB']}
            style={styles.gradient}
            start={{ x: 0.1, y: 0.1 }}
            end={{ x: 0.9, y: 0.7 }}
        >
            <SafeAreaView style={styles.container}>
                <SwansLogo />
            </SafeAreaView>
        </LinearGradient>
    );
};

export default Loading;
