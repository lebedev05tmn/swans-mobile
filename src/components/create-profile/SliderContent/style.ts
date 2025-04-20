import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    container: { 
        flex: 1,
    },
    title: {
        fontFamily: 'MontserratAlternates_700Bold',
        fontSize: 28,
        lineHeight: 34,
        color: '#FFFFFF',
        marginBottom: 14,
    },
    titleAlign: {
        textAlign: 'center',
    },
    description: {
        fontFamily: 'MontserratAlternates_400Regular',
        fontSize: 18,
        lineHeight: 22,
        color: '#FFFFFF',
        marginBottom: 12,
    },
    errorMessage: {
        fontFamily: 'MontserratAlternates_500Medium',
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
    },
    skipButtonText: {
        fontFamily: 'MontserratAlternates_500Medium',
        fontSize: 14,
        lineHeight: 16,
        color: '#404040',
        textDecorationLine: 'underline',
        marginTop: 12,
        textAlign: 'center',
    }
});

export default styles;
