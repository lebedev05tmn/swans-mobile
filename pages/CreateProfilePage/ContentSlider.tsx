import { useWindowDimensions } from 'react-native';
import contentPages from './ContentPages';
import useContentSwitcher from './store';
import Animated, {
    Easing,
    runOnJS,
    useAnimatedStyle,
    useSharedValue,
    withTiming,
} from 'react-native-reanimated';
import { useEffect } from 'react';

const ContentSlider = () => {
    const {
        currentIndex,
        isFirstRender,
        activeIndex,
        halfSwitchTime,
        changeActiveIndex,
        firstRender,
    } = useContentSwitcher();

    const translateContent = useSharedValue<number>(0);
    const screenWidth = useWindowDimensions().width;

    const animatedStyles = useAnimatedStyle(() => ({
        transform: [{ translateX: translateContent.value }],
    }));

    useEffect(() => {
        if (isFirstRender) {
            firstRender();
            return;
        }
        const startAnimation = () => {
            const direction = currentIndex > activeIndex ? screenWidth : -screenWidth;
            translateContent.value = withTiming(
                -direction,
                {
                    duration: halfSwitchTime,
                    easing: Easing.in(Easing.cubic),
                },
                () => {
                    runOnJS(changeActiveIndex)();

                    translateContent.value = direction;
                    translateContent.value = withTiming(0, {
                        duration: halfSwitchTime,
                        easing: Easing.out(Easing.cubic),
                    });
                },
            );
        };
        startAnimation();
    }, [currentIndex]);

    return (
        <Animated.View style={animatedStyles}>
            {contentPages[activeIndex]}
        </Animated.View>
    );
};

export default ContentSlider;
