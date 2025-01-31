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
import BackButton from '@/src/components/createProfile/backButton';
const CreateProfilePage: FC = () => {
    const { prev } = createProfileStore((state) => state.actions);

    const nextIndex = createProfileStore((state) => state.nextIndex);
    const currentIndex = createProfileStore((state) => state.currentIndex);
    const pages = createProfileStore((state) => state.pages);

    const translateFooter = useSharedValue<number>(60);
    const translateHeader = useSharedValue<number>(0);

    const animatedFooterStyles = useAnimatedStyle(() => ({
        transform: [{ translateY: translateFooter.value }],
    }));
    const animatedHeaderStyles = useAnimatedStyle(() => ({
        transform: [{ translateY: translateHeader.value }],
    }));

    useEffect(() => {
        if (nextIndex === pages - 1 && currentIndex === pages - 2) {
            translateFooter.value = withTiming(300, {
                duration: ANIMATION_TIME,
                easing: Easing.in(Easing.cubic),
            });

            translateHeader.value = withTiming(-300, {
                duration: ANIMATION_TIME,
                easing: Easing.in(Easing.cubic),
            });
        }

        if (currentIndex === pages - 1 && nextIndex === pages - 2) {
            setTimeout(() => {
                translateFooter.value = withTiming(60, {
                    duration: ANIMATION_TIME,
                    easing: Easing.out(Easing.cubic),
                });

                translateHeader.value = withTiming(0, {
                    duration: ANIMATION_TIME,
                    easing: Easing.out(Easing.cubic),
                });
            }, ANIMATION_TIME);
        }
    }, [nextIndex]);

    return (
        <LinearGradient
            colors={['#B18FCF', '#87CEEB']}
            style={styles.gradient}
            start={{ x: 0.1, y: 0.1 }}
            end={{ x: 0.9, y: 0.7 }}
        >
            <SafeAreaView style={styles.container}>
                <View style={{ flex: 1 }}>
                    <BackButton onPress={prev} />

                    {(currentIndex === pages - 1) ? null : (
                        <Animated.View style={animatedHeaderStyles}>
                            <Header />
                        </Animated.View>
                    )}

                    <BodySlider />
                </View>

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
