import { View, StyleSheet } from 'react-native';
import ProgressWave from '@/src/assets/svg/progressWave.svg';
import useCreateProfileStore from '@/src/shared/stores/createProfile/store';
import Animated, {
    Easing,
    useSharedValue,
    withTiming,
} from 'react-native-reanimated';
import { useEffect } from 'react';
import createProfileBodyComponents from '@/src/components/createProfile/sliderContent';
import { ANIMATION_TIME } from '@/src/shared/config/config';

const Header = () => {
    const nextIndex = useCreateProfileStore((state) => state.nextIndex);
    const currentIndex = useCreateProfileStore((state) => state.currentIndex);
    const isFirstRender = useCreateProfileStore((state) => state.isFirstRender);

    const width = useSharedValue(0);
    const animationTime = ANIMATION_TIME * 2;
    const progressWidthStep = 253 / createProfileBodyComponents.length;

    useEffect(() => {
        const startAnimation = () => {
            let direction = 1;

            if (nextIndex < currentIndex && !isFirstRender) {
                direction = -1;
            }

            width.value = withTiming(
                width.value + direction * progressWidthStep,
                {
                    duration: animationTime,
                    easing: Easing.inOut(Easing.cubic),
                },
            );
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
                    left: 50,
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
        left: 50,
    },
});

export default Header;
