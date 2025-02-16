import { View, StyleSheet, Dimensions } from 'react-native';
import ProgressWave from '@/src/assets/svg/progressWave.svg';
import useCreateProfileStore from '@/src/shared/stores/useCreateProfileStore';
import Animated, {
    Easing,
    useSharedValue,
    withTiming,
} from 'react-native-reanimated';
import { useEffect } from 'react';
import { ANIMATION_TIME } from '@/src/shared/config/config';

const displayWidth = Dimensions.get('window').width;

const Header = () => {
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

const styles = StyleSheet.create({
    header: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        height: 'auto',
        width: '100%',
        marginVertical: 28,
        marginTop: 40,
    },
    progress: {
        position: 'absolute',
        left: displayWidth * 0.15,
    },
});

export default Header;
