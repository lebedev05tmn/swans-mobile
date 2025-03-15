import ProgressWave from '@assets/svg/progressWave.svg';
import { ANIMATION_TIME } from '@shared/config/config';
import useCreateProfileStore from '@stores/useCreateProfileStore';
import { FC, useEffect } from 'react';
import { Dimensions, View } from 'react-native';
import Animated, {
    Easing,
    useSharedValue,
    withTiming,
} from 'react-native-reanimated';
import styles from './style';

const displayWidth = Dimensions.get('window').width;

const Header: FC = () => {
    const nextIndex = useCreateProfileStore((state) => state.nextIndex);
    const pages = useCreateProfileStore((state) => state.pages);
    const width = useSharedValue(0);
    const animationTime = ANIMATION_TIME * 2;
    const progressWidthStep = 253 / (pages - 1);

    useEffect(() => {
        const startAnimation = () => {
            width.value = withTiming(progressWidthStep * (nextIndex + 1), {
                duration: animationTime,
                easing: Easing.inOut(Easing.cubic),
            });
        };
        startAnimation();
    }, [nextIndex]);

    return (
        <View style={styles.header}>
            <ProgressWave style={styles.progress} />

            <Animated.View
                style={{
                    width,
                    height: 17,
                    position: 'absolute',
                    left: displayWidth * 0.15,
                    overflow: 'hidden',
                }}
            >
                <ProgressWave
                    stroke={'#60A0FF'}
                    style={{
                        width: '100%',
                    }}
                />
            </Animated.View>
        </View>
    );
};

export default Header;
