import { Pressable, View, StyleSheet } from 'react-native';
import ProgressWave from '@/src/assets/svg/progressWave.svg';
import useCreateProfileStore from '@/src/pages/CreateProfilePage/store';
import Animated, {
    Easing,
    useSharedValue,
    withTiming,
} from 'react-native-reanimated';
import { useEffect } from 'react';
import createProfileBodyComponents from '@/src/pages/CreateProfilePage/content';
import { ANIMATION_TIME } from '@/src/shared/config/config';
import { ArrowLeft } from 'lucide-react-native';

const Header = () => {
    const nextIndex = useCreateProfileStore((state) => state.nextIndex);
    const currentIndex = useCreateProfileStore((state) => state.currentIndex);
    const isFirstRender = useCreateProfileStore((state) => state.isFirstRender);
    const isBackButtonDisabled = useCreateProfileStore(
        (state) => state.isPreviousButtonDisabled,
    );

    const prev = useCreateProfileStore((state) => state.actions.prev);

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
            <Pressable disabled={isBackButtonDisabled} onPress={prev}>
                <ArrowLeft color={'#CECECE'} size={24} />
            </Pressable>
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
        justifyContent: 'space-between',
        alignItems: 'center',
        height: 30,
        marginVertical: 28,
    },
    progress: {
        position: 'absolute',
        left: 50,
    },
});

export default Header;
