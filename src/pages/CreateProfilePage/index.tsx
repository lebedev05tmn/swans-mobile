import React, { FC } from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import BodySlider from '@/src/components/createProfile/mainSlider';
import Header from '@/src/components/createProfile/header';
import { ArrowLeft } from 'lucide-react-native';
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

const CreateProfilePage: FC = () => {
    const prev = createProfileStore((state) => state.actions.prev);
    const isPreviousButtonDisabled = createProfileStore(
        (state) => state.isPreviousButtonDisabled,
    );
    const isHeaderVisible = createProfileStore(
        (state) => state.isHeaderVisible,
    );
    const isFooterVisible = createProfileStore(
        (state) => state.isFooterVisible,
    );
    const isChooseInterestsActive = createProfileStore(
        (state) => state.isChooseInterestsActive,
    );

    const translateFooter = useSharedValue<number>(275);
    const translateHeader = useSharedValue<number>(0);

    const animatedFooterStyles = useAnimatedStyle(() => ({
        transform: [{ translateY: translateFooter.value }],
    }));
    const animatedHeaderStyles = useAnimatedStyle(() => ({
        transform: [{ translateY: translateHeader.value }],
    }));

    React.useEffect(() => {
        if (isFooterVisible) {
            translateFooter.value = withTiming(25, {
                duration: ANIMATION_TIME,
                easing: Easing.out(Easing.cubic),
            });
        } else {
            translateFooter.value = withTiming(275, {
                duration: ANIMATION_TIME,
                easing: Easing.in(Easing.cubic),
            });
        }
    }, [isFooterVisible]);

    React.useEffect(() => {
        if (isHeaderVisible) {
            translateHeader.value = withTiming(0, {
                duration: ANIMATION_TIME,
                easing: Easing.out(Easing.cubic),
            });
        } else {
            translateHeader.value = withTiming(-300, {
                duration: ANIMATION_TIME,
                easing: Easing.in(Easing.cubic),
            });
        }
    }, [isHeaderVisible]);

    return (
        <LinearGradient
            colors={['#B18FCF', '#87CEEB']}
            style={styles.gradient}
            start={{ x: 0.1, y: 0.1 }}
            end={{ x: 0.9, y: 0.7 }}
        >
            <SafeAreaView style={styles.container}>
                <View style={{ flex: 1 }}>
                    <TouchableOpacity
                        disabled={isPreviousButtonDisabled}
                        onPress={prev}
                        style={styles.prevButton}
                    >
                        <ArrowLeft color={'#CECECE'} size={24} />
                    </TouchableOpacity>

                    <Animated.View style={animatedHeaderStyles}>
                        <Header />
                    </Animated.View>

                    {isChooseInterestsActive ? (
                        <ChooseInterests />
                    ) : (
                        <BodySlider />
                    )}
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
