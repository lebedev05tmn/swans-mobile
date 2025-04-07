import { StyleSheet, Dimensions } from 'react-native';
const { width: screenWidth, height: screenHeight } = Dimensions.get('window');
const styles = StyleSheet.create({
    gradient: {
        flex: 1,
    },
    container: {
        flex: 1,
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    topFlex: {
        alignItems: 'center',
        paddingTop: (258 / 852) * screenHeight,
        paddingBottom: 40,
    },
    title: {
        fontFamily: 'MontserratAlternates-Bold',
        fontSize: 48,
        textAlign: 'center',
        color: '#FF4C00',
        textShadowColor: 'rgba(111, 75, 232, 0.4)',
        textShadowOffset: { width: 0, height: 2 },
        textShadowRadius: 20,
        elevation: 4,
    },
    logoContainer: {
        width: '80%',
        maxWidth: 231,
        aspectRatio: 231 / 155,
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 10,
    },
    logo: {
        width: '100%',
        height: '100%',
        resizeMode: 'contain',
    },
    textStyle: {
        fontFamily: 'MontserratAlternates-Bold',
        fontSize: 20,
        textAlign: 'center',
        color: '#FFFFFF',
        marginBottom: '5%',
        textShadowColor: 'rgba(82, 68, 232, 0.3)',
        textShadowOffset: { width: 0, height: 3 },
        textShadowRadius: 6,
        elevation: 10, // Добав
    },
    bottomFlex: {
        alignItems: 'center',
        marginBottom: '9.74%',
    },
    buttonBackground: {
        width: '80%',
        maxWidth: 300,
        height: 50,
        backgroundColor: '#2880FF',
        borderRadius: 16,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: screenHeight * 0.03,
        fontFamily: 'Roboto-Bold',
    },
    mainButton: {
        width: '80%',
        maxWidth: 300,
        height: 50,
        backgroundColor: '#2B80FF',
        borderRadius: 16,
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 16,
    },
    mainButtonText: {
        fontFamily: 'Roboto-Medium',
        fontSize: 20,
        color: '#FFFFFF',
        textAlign: 'center',
        textAlignVertical: 'center',
        width: '100%',
    },

    terms: {
        marginBottom: '10%',
        fontFamily: 'MontserratAlternates-Bold',
        fontSize: 15,
        lineHeight: 18.29,
        color: '#FFFFFF',
        textAlign: 'center',
        maxWidth: 300,
        textShadowColor: '#00000040',
        textShadowOffset: { width: 0, height: 3 },
        textShadowRadius: 6,
        elevation: 10,
    },
    link: {
        fontFamily: 'MontserratAlternates-Bold',
        textDecorationLine: 'underline',
        textDecorationStyle: 'solid',
        color: '#FFFFFF',
    },
});

export default styles;
