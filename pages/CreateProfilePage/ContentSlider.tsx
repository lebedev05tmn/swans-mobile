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
    const currentIndex = useContentSwitcher((state) => state.currentIndex);
    const activeIndex = useContentSwitcher((state) => state.activeIndex);
    const isFirstRender = useContentSwitcher((state) => state.isFirstRender);
    const halfSwitchTime = useContentSwitcher((state) => state.halfSwitchTime);
    const firstRender = useContentSwitcher((state) => state.firstRender);
    const changeActiveIndex = useContentSwitcher((state) => state.changeActiveIndex);
    const disableCountinueButton = useContentSwitcher((state) => state.disableCountinueButton);
    const disableBackButton = useContentSwitcher((state) => state.disableBackButton);
    const activateCountinueButton = useContentSwitcher((state) => state.activateCountinueButton);
    const activateBackButton = useContentSwitcher((state) => state.activateBackButton);
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

        disableCountinueButton();
        disableBackButton();
        setTimeout(() => {
            activateCountinueButton();
            activateBackButton();
        }, halfSwitchTime * 2);

        const startAnimation = () => {
            const direction =
                currentIndex > activeIndex ? screenWidth : -screenWidth;
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
