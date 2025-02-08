import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    title: {
        fontFamily: 'MontserratAlternates_700Bold',
        fontSize: 28,
        lineHeight: 34,
        color: '#FFFFFF',
        marginBottom: 14,
    },
    description: {
        fontFamily: 'MontserratAlternates_400Regular',
        fontSize: 18,
        lineHeight: 22,
        color: '#FFFFFF',
        marginBottom: 12,
    },
    errorMessage: {
        fontFamily: 'MontserratAlternates_400Regular',
        color: '#FF0000',
        fontSize: 12,
        lineHeight: 14,
        position: 'absolute',
        top: 5,
    },
    textWrap: {
        width: '100%',
        height: 40,
        flexDirection: 'row',
        alignItems: 'center',
        marginHorizontal: 4,
    }
});

export default styles;
