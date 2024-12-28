import { LinearGradient } from 'expo-linear-gradient';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StyleSheet } from 'react-native';
import { FC } from 'react';
import { ChooseInterestsContent } from './content';
import Head from '@/src/components/ChooseInterests/Head';
import SubmitButton from '@/src/components/ChooseInterests/SubmitButton';

const ChooseInterests: FC = () => {
    return (
        <LinearGradient
            colors={['#B18FCF', '#87CEEB']}
            style={styles.gradient}
            start={{ x: 0.1, y: 0.1 }}
            end={{ x: 0.9, y: 0.7 }}
        >
            <SafeAreaView style={styles.container}>
                <Head />
                <ChooseInterestsContent />
                <SubmitButton />
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
    title: {
        fontFamily: 'MontserratAlternates_700Bold',
        fontWeight: 700,
        fontSize: 28,
        lineHeight: 34,
        textAlign: 'center',
        color: '#FFFFFF',
        marginTop: 16,
        marginBottom: 30,
    },
});

export default ChooseInterests;
