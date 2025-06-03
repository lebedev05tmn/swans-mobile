import { StyleSheet, Dimensions } from 'react-native';

const { height: screenHeight, width: screenWidth } = Dimensions.get('window');
const BASE_HEIGHT = 844; 

const adaptivePixel = (pixelValue: number) => {
    return (pixelValue / BASE_HEIGHT) * screenHeight;
};

const titleMarginBottom = adaptivePixel(20);
const buttonMarginBottom = adaptivePixel(12);
const buttonHeight = 50;
const contentMaxWidth = Math.min(350, screenWidth * 0.85);

const styles = StyleSheet.create({
    modalOverlay: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        zIndex: 1000,
    },

    modalContent: {
        position: 'absolute',
        bottom: 0,
        width: '100%',
        backgroundColor: '#FFFFFF',
        paddingTop: adaptivePixel(20),

        paddingHorizontal: 0,
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        maxHeight: screenHeight * 0.8,
        alignItems: 'center',
        zIndex: 10001,
    },

    contentInnerWrapper: {
        width: '100%',
        maxWidth: contentMaxWidth,
        alignItems: 'center',
        paddingHorizontal: 20,
    },

    modalTitle: {
        alignSelf: 'center',
        fontSize: 22,
        textAlign: 'center',
        marginBottom: titleMarginBottom,
        fontFamily: 'MontserratAlternates-Bold',
        color: '#333',
    },

    authButton: {
        width: '100%',
        height: buttonHeight,
        backgroundColor: '#FFFFFF',
        borderWidth: 1,
        borderColor: '#666666',
        borderRadius: 16,
        marginBottom: buttonMarginBottom,
        justifyContent: 'center',
        alignItems: 'center',
        overflow: 'hidden',
    },

    buttonContent: {
        width: '100%',
        flexDirection: 'row-reverse',
        alignItems: 'center',
        justifyContent: 'center',
        paddingHorizontal: 20,
    },

    buttonText: {
        fontSize: 16,
        
        color: '#000000',
        fontFamily: 'Roboto-Medium',
    },

    buttonIcon: {
        marginLeft: 8,
        paddingVertical:1,
    },
});

export default styles;
