import { StyleSheet, Dimensions } from 'react-native';

const { width: screenWidth, height } = Dimensions.get('window');

const styles = StyleSheet.create({
    container: { flex: 1 },
    inner: {
        marginTop: 23,
        flex: 1,
        paddingHorizontal: '5%',
        overflow: 'hidden',
    },
    animatedWrapperBase: {
        width: '100%',
        alignItems: 'center',
    },
    title: {
        fontSize: 28,
        color: '#FFFFFF',
        textAlign: 'center',
        marginBottom: 14,
        fontFamily: 'MontserratAlternates-Bold',
    },
    button: {},
    subtitle: {
        fontSize: 18,
        color: 'rgba(255, 255, 255, 0.85)',
        textAlign: 'center',
        marginBottom: 70,
        lineHeight: 18 * 1.4,
        fontFamily: 'MontserratAlternates-Regular',
    },
    inputsContainer: { width: '100%', alignItems: 'center' },
    inputWrapper: { width: '100%', marginBottom: height * 0.018 },
    inputLabel: {
        fontFamily: 'MontserratAlternates-Bold',
        fontSize: 14,
        lineHeight: 16,
        color: 'rgba(255, 255, 255, 0.9)',
        marginBottom: 6,
        marginLeft: 4,
        textAlign: 'left',
        width: '100%',
    },
    buttonContainer: {
        position: 'absolute',
        bottom: 53,
        width: '100%',
        alignItems: 'center',
    },
    buttonText: {
        color: '#404040',
        fontSize: 16,
        fontFamily: 'Roboto-Medium',
        textAlignVertical: 'center',
        paddingVertical: 15.5,
    },
    linkWrapper: { width: '100%', marginTop: 8, alignItems: 'center' },
    link: {
        fontSize: 14,
        fontFamily: 'Roboto-Medium',
        textDecorationLine: 'underline',
        color: '#404040',
        textAlign: 'center',
        paddingVertical: 8,
        paddingHorizontal: 5,
        lineHeight: 14 * 1.3,
    },
});

export default styles;
