import React, { FC, useEffect, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import BodySlider from '@/src/components/createProfile/mainSlider';
import Header from '@/src/components/createProfile/header';
import createProfileStore from '@/src/shared/stores/createProfile/store';
import SeaFooter from '@/src/assets/svg/seaFooter.svg';
import Animated, {
    Easing,
    useAnimatedStyle,
    useSharedValue,
    withTiming,
} from 'react-native-reanimated';
import { ANIMATION_TIME } from '@/src/shared/config/config';
import ChooseInterests from '@/src/components/createProfile/chooseInterests/index';
import BackButton from '@/src/components/createProfile/backButton';
import { Dimensions } from 'react-native';

const CreateProfilePage: FC = () => {
    const { prev, toggleContent, setFirstRender, unsetFirstRender } =
        createProfileStore((state) => state.actions);
    const isChooseInterestsActive = createProfileStore(
        (state) => state.isChooseInterestsActive,
    );
    const [page, setPage] = useState(isChooseInterestsActive); // false - slider, true - chooseInterests
    const isFirstRender = createProfileStore((state) => state.isFirstRender);
    const displayWidth = Dimensions.get('window').width;

    const translateFooter = useSharedValue<number>(60);
    const translateHeader = useSharedValue<number>(0);
    const translateContent = useSharedValue<number>(0);

    const animatedFooterStyles = useAnimatedStyle(() => ({
        transform: [{ translateY: translateFooter.value }],
    }));
    const animatedHeaderStyles = useAnimatedStyle(() => ({
        transform: [{ translateY: translateHeader.value }],
    }));
    const translateContentStyles = useAnimatedStyle(() => ({
        transform: [{ translateX: translateContent.value }],
    }));

    const switchOnInterests = () => {
        translateContent.value = withTiming(-displayWidth, {
            duration: ANIMATION_TIME,
            easing: Easing.in(Easing.cubic),
        });

        translateHeader.value = withTiming(-300, {
            duration: ANIMATION_TIME,
            easing: Easing.in(Easing.cubic),
        });

        translateFooter.value = withTiming(310, {
            duration: ANIMATION_TIME,
            easing: Easing.in(Easing.cubic),
        });

        setTimeout(() => {
            translateContent.value = displayWidth;
            setPage(!page);

            translateContent.value = withTiming(0, {
                duration: ANIMATION_TIME,
                easing: Easing.out(Easing.cubic),
            });
        }, ANIMATION_TIME);
    };

    const switchOnSlider = () => {
        setFirstRender();

        translateContent.value = withTiming(displayWidth, {
            duration: ANIMATION_TIME,
            easing: Easing.in(Easing.cubic),
        });

        setTimeout(() => {
            translateHeader.value = withTiming(0, {
                duration: ANIMATION_TIME,
                easing: Easing.out(Easing.cubic),
            });

            translateFooter.value = withTiming(60, {
                duration: ANIMATION_TIME,
                easing: Easing.out(Easing.cubic),
            });
            translateContent.value = -displayWidth;

            setPage(!page);

            translateContent.value = withTiming(0, {
                duration: ANIMATION_TIME,
                easing: Easing.out(Easing.cubic),
            });

            setTimeout(() => unsetFirstRender(), 0);
        }, ANIMATION_TIME);
    };

    const back = () => {
        toggleContent();
    };

    useEffect(() => {
        if (isFirstRender) {
            unsetFirstRender();
            return;
        }

        if (isChooseInterestsActive) {
            switchOnInterests();
        } else {
            switchOnSlider();
        }
    }, [isChooseInterestsActive]);

    return (
        <LinearGradient
            colors={['#B18FCF', '#87CEEB']}
            style={styles.gradient}
            start={{ x: 0.1, y: 0.1 }}
            end={{ x: 0.9, y: 0.7 }}
        >
            <SafeAreaView style={styles.container}>
                {page ? (
                    <View style={{ flex: 1 }}>
                        <BackButton onPress={back} />

                        <Animated.View
                            style={[translateContentStyles, { flex: 1 }]}
                        >
                            <ChooseInterests />
                        </Animated.View>
                    </View>
                ) : (
                    <View style={{ flex: 1 }}>
                        <BackButton onPress={prev} />

                        <Animated.View style={animatedHeaderStyles}>
                            <Header />
                        </Animated.View>

                        <Animated.View
                            style={translateContentStyles}
                        >
                            <BodySlider />
                        </Animated.View>
                    </View>
                )}

                <Animated.View style={animatedFooterStyles}>
                    <SeaFooter
                        style={{
                            position: 'absolute',
                            bottom: 0,
                            alignSelf: 'center',
                        }}
                    />
                </Animated.View>
            </SafeAreaView>
        </LinearGradient>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginHorizontal: '7%',
    },
    gradient: {
        flex: 1,
        overflow: 'hidden',
    },
    prevButton: {
        position: 'absolute',
        top: 29,
        left: 0,
    },
});

export default CreateProfilePage;
