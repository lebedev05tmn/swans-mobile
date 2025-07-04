import SeaFooter from '@/src/assets/svg/seaFooter.svg';
import BackButton from '@/src/components/create-profile/BackButton';
import Header from '@/src/components/create-profile/Header';
import BodySlider from '@/src/components/create-profile/MainSlider';
import * as Location from 'expo-location';
import { ANIMATION_TIME } from '@/src/shared/config/config';
import useMetaData from '@/src/shared/hooks/useMetaData';
import useCreateProfileStore from '@/src/shared/stores/useCreateProfileStore';
import { LinearGradient } from 'expo-linear-gradient';
import React, { FC, useEffect } from 'react';
import { View } from 'react-native';
import Animated, {
    Easing,
    useAnimatedStyle,
    useSharedValue,
    withTiming,
} from 'react-native-reanimated';
import { SafeAreaView } from 'react-native-safe-area-context';
import styles from './style';

const CreateProfilePage: FC = () => {
    const { metaData, isLoading } = useMetaData();

    const { prev, setCity } = useCreateProfileStore((state) => state.actions);

    const nextIndex = useCreateProfileStore((state) => state.nextIndex);
    const currentIndex = useCreateProfileStore((state) => state.currentIndex);
    const pages = useCreateProfileStore((state) => state.pages);

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
            translateHeader.value = withTiming(-300, {
                duration: ANIMATION_TIME,
                easing: Easing.in(Easing.cubic),
            });
        }

        if (nextIndex === pages - 2 && currentIndex === pages - 3) {
            translateFooter.value = withTiming(300, {
                duration: ANIMATION_TIME,
                easing: Easing.in(Easing.cubic),
            });
        }

        if (currentIndex === pages - 1 && nextIndex === pages - 2) {
            setTimeout(() => {
                translateHeader.value = withTiming(0, {
                    duration: ANIMATION_TIME,
                    easing: Easing.out(Easing.cubic),
                });
            }, ANIMATION_TIME);
        }

        if (currentIndex === pages - 2 && nextIndex === pages - 3) {
            setTimeout(() => {
                translateFooter.value = withTiming(60, {
                    duration: ANIMATION_TIME,
                    easing: Easing.out(Easing.cubic),
                });
            }, ANIMATION_TIME);
        }
    }, [nextIndex]);

    useEffect(() => {
        if (!isLoading) {
            const fetchLocation = async () => {
                try {
                    const location = await Location.getCurrentPositionAsync({});
                    const { latitude, longitude } = location.coords;

                    const geoCode = await Location.reverseGeocodeAsync({
                        latitude,
                        longitude,
                    });

                    if (geoCode[0].city) setCity(geoCode[0].city);
                } catch (error) {
                    console.error('Ошибка при получении локации:', error);
                }
            };

            fetchLocation();
        }
    }, [metaData]);

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

                    {currentIndex === pages - 1 ? null : (
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

export default CreateProfilePage;
