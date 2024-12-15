import React from 'react';
import { Pressable, StyleSheet, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { LinearGradient } from 'expo-linear-gradient';
import ArrowLeftIcon from "@/assets/svg/ArrowLeftIcon";
import ProgressWave from "@/assets/svg/progress.svg";
import pages from "./pages";
import useStore from './store';


const CreateProfilePage = () => {
    const previousPage = useStore((state) => state.previousPage);
    const currentIndex = useStore((state) => state.currentIndex);
    const CurrentComponent = pages[currentIndex];

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
                        onPress={previousPage}
                        style={styles.arrowLeftIcon}
                    >
                        <ArrowLeftIcon />
                    </Pressable>
                    <ProgressWave width={'64%'} height={'auto'}/>
                </View>
                <CurrentComponent />
            </SafeAreaView>
        </LinearGradient>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    gradient: {
        flex: 1,
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        height: 30,
        marginHorizontal: '7%',
        marginVertical: 28,
    },
    arrowLeftIcon: {
        position: 'absolute',
        left: 0,
    },
});

export default CreateProfilePage;