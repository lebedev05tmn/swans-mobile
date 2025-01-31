import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import ChooseInterestsContent from './content';
import SubmitButton from './SubmitButton/index';

const ChooseInterests = () => {
    return (
        <View style={styles.container}>
            <Text style={styles.title}>Выбери свои{'\n'} интересы</Text>
            <ChooseInterestsContent />
            <SubmitButton />
        </View>
    );
};

export default ChooseInterests;

const styles = StyleSheet.create({
    container: {
        height: '100%',
        width: '100%',
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
