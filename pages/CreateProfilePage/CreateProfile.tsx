import React from 'react';
import { useWindowDimensions, Pressable, StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import ArrowLeftIcon from '@/assets/svg/arrowLeftIcon.svg';
import ProgressWave from '@/assets/svg/progress.svg';
import useContentSwitcher from './store';
import contentPages from './ContentPages';
import Animated, {
    useSharedValue,
    useAnimatedStyle,
    withSpring,
} from 'react-native-reanimated';

const CreateProfilePage = () => {
    const screenWidth = useWindowDimensions().width;
    const { currentIndex, next, prev } = useContentSwitcher();
    const translateX = useSharedValue(0);

    const animateTransition = (newIndex: number) => {
        if (newIndex > currentIndex) {
            translateX.value = withSpring(-screenWidth);
        } else {
            translateX.value = withSpring(screenWidth);
        }
    };

    const animatedStyle = useAnimatedStyle(() => ({
        transform: [{ translateX: translateX.value }],
    }));

    return (
        <LinearGradient
            colors={['#B18FCF', '#87CEEB']}
            style={styles.gradient}
            start={{ x: 0.1, y: 0.1 }}
            end={{ x: 0.9, y: 0.7 }}
        >
            <SafeAreaView style={styles.container}>
                <View style={styles.header}>
                    <Pressable
                        style={styles.arrowLeftIcon}
                        onPress={() => {
                            prev();
                            animateTransition(currentIndex - 1);
                        }}
                    >
                        <ArrowLeftIcon />
                    </Pressable>
                    <ProgressWave />
                </View>
                <Animated.View style={[animatedStyle]}>
                    {contentPages[currentIndex]}
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
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        height: 30,
        marginVertical: 28,
    },
    arrowLeftIcon: {
        position: 'absolute',
        left: 0,
    },
});

export default CreateProfilePage;
