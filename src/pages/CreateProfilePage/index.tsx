import React from 'react';
import { StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import CreateProfileSlider from '@/src/components/createProfilePage/createProfileSlider';
import Header from '@/src/components/createProfilePage/header';

const CreateProfilePage = () => {
    return (
        <LinearGradient
            colors={['#B18FCF', '#87CEEB']}
            style={styles.gradient}
            start={{ x: 0.1, y: 0.1 }}
            end={{ x: 0.9, y: 0.7 }}
        >
            <SafeAreaView style={styles.container}>
                <Header />

                <CreateProfileSlider />
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
});

export default CreateProfilePage;
