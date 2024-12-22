import { Pressable, View, StyleSheet } from 'react-native';
import ArrowLeftIcon from '@/assets/svg/arrowLeftIcon.svg';
import ProgressWaveBackground from '@/assets/svg/progressWaveBackground.svg';
import useContentSwitcher from '@/pages/CreateProfilePage/store';
import Animated, {
    Easing,
    useSharedValue,
    withTiming,
} from 'react-native-reanimated';
import { useEffect } from 'react';
import contentPages from '@/pages/CreateProfilePage/ContentPages';
import ProgressWaveAnimated from '@/assets/svg/ProgressWaveAnimated';

const Header = () => {
    const currentIndex = useContentSwitcher((state) => state.currentIndex);
    const activeIndex = useContentSwitcher((state) => state.activeIndex);
    const isFirstRender = useContentSwitcher((state) => state.isFirstRender);
    const halfSwitchTime = useContentSwitcher((state) => state.halfSwitchTime);
    const isBackButtonDisabled = useContentSwitcher((state) => state.isBackButtonDisabled);
    const prev = useContentSwitcher((state) => state.prev);
    const width = useSharedValue(0);
    const animationTime = halfSwitchTime * 2;
    const progressWidthStep = 253 / (contentPages.length + 1);

    useEffect(() => {
        const startAnimation = () => {
            let direction = 1;
            
            if ((currentIndex < activeIndex) && !isFirstRender) {
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
    }, [currentIndex]);

    return (
        <View style={styles.header}>
            <Pressable disabled={ isBackButtonDisabled } onPress={prev}>
                <ArrowLeftIcon />
            </Pressable>
            <ProgressWaveBackground style={styles.progress} />

            <Animated.View
                style={{ width, height: 17, position: 'absolute', left: 50, overflow: 'hidden' }}
            >
                <ProgressWaveAnimated
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
