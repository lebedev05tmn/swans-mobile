import { StyleSheet, Dimensions,StatusBar, Platform } from 'react-native';
const { width: screenWidth, height: screenHeight } = Dimensions.get('window');
const statusBarHeight = Platform.OS === 'android' ? StatusBar.currentHeight || 0 : 44;
import AppScreen from './index';

const styles = StyleSheet.create({
    gradient: {
        flex: 1,
        paddingTop:0,
    },
    container: {
        flex: 1,
        justifyContent: 'space-between',
        paddingTop: (screenHeight * 0.3028)+statusBarHeight,
        alignItems: 'center',
        
    },
    link: {
        textDecorationLine: 'underline',
        textDecorationStyle: 'solid',
        color: '#FFFFFF',
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
        marginBottom:52,
    },
    bottomFlex: {
        alignItems: 'center',
        marginBottom: 83,
    },
    mainButtonText: {
        fontWeight: 700,
        fontSize: 20,
        color: '#FFFFFF',
        textAlign: 'center',
        textAlignVertical: 'center',
        width: '100%',
        
    },
    terms: {
       
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
});

export default styles;
