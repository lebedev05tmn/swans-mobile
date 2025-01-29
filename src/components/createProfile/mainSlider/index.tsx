import { useWindowDimensions } from 'react-native';
import createProfileBodyComponents from '@/src/components/createProfile/sliderContent';
import useCreateProfileStore from '@/src/shared/stores/createProfile/store';
import Animated, {
    Easing,
    runOnJS,
    useAnimatedStyle,
    useSharedValue,
    withTiming,
} from 'react-native-reanimated';
import { useEffect } from 'react';
import { ANIMATION_TIME } from '@/src/shared/config/config';

const MainSlider = (): JSX.Element => {
    const nextIndex = useCreateProfileStore((state) => state.nextIndex);
    const currentIndex = useCreateProfileStore((state) => state.currentIndex);
    const isFirstRender = useCreateProfileStore((state) => state.isFirstRender);

    const {
        unsetFirstRender,
        changeActiveIndex,
        disableCountinueButton,
        disableBackButton,
        activateCountinueButton,
        activateBackButton,
    } = useCreateProfileStore((state) => state.actions);

    const translateContent = useSharedValue<number>(0);
    const { width: screenWidth } = useWindowDimensions();

    const animatedStyles = useAnimatedStyle(() => ({
        transform: [{ translateX: translateContent.value }],
    }));

    useEffect(() => {
        if (isFirstRender) return;

        disableCountinueButton();
        disableBackButton();
        setTimeout(() => {
            activateCountinueButton();
            activateBackButton();
        }, ANIMATION_TIME * 2);

        const startAnimation = () => {
            const direction =
                nextIndex > currentIndex ? screenWidth : -screenWidth;
            translateContent.value = withTiming(
                -direction,
                {
                    duration: ANIMATION_TIME,
                    easing: Easing.in(Easing.cubic),
                },
                () => {
                    runOnJS(changeActiveIndex)();

                    translateContent.value = direction;
                    translateContent.value = withTiming(0, {
                        duration: ANIMATION_TIME,
                        easing: Easing.out(Easing.cubic),
                    });
                },
            );
        };

        startAnimation();
    }, [nextIndex]);

    return (
        <Animated.View style={animatedStyles}>
            {createProfileBodyComponents[currentIndex]}
        </Animated.View>
    );
};

export default MainSlider;
