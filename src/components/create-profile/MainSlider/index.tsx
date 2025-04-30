import { useWindowDimensions } from 'react-native';
import createProfileBodyComponents from '@/src/components/create-profile/SliderContent';
import useCreateProfileStore from '@/src/shared/stores/useCreateProfileStore';
import Animated, {
    Easing,
    useAnimatedStyle,
    useSharedValue,
    withSpring,
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
        changeCurrentIndex,
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
        if (isFirstRender) {
            unsetFirstRender();
            return;
        }

        disableCountinueButton();
        disableBackButton();
        setTimeout(() => {
            activateCountinueButton();
            activateBackButton();
        }, ANIMATION_TIME * 2);

        const startAnimation = () => {
            const direction =
                nextIndex > currentIndex
                    ? screenWidth * 1.1
                    : -screenWidth * 1.1;

            translateContent.value = withTiming(-direction, {
                duration: ANIMATION_TIME,
                easing: Easing.in(Easing.cubic),
            });

            setTimeout(() => {
                changeCurrentIndex();

                translateContent.value = direction;

                translateContent.value = withSpring(0, {
                    damping: 16,
                });
            }, ANIMATION_TIME);
        };

        startAnimation();
    }, [nextIndex]);

    return (
        <Animated.View style={[animatedStyles, { flex: 1 }]}>
            {createProfileBodyComponents[currentIndex]}
        </Animated.View>
    );
};

export default MainSlider;
