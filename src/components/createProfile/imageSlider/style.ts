import { Dimensions, StyleSheet } from 'react-native';

const deviceHeight = Dimensions.get('window').height;

const styles = StyleSheet.create({
    container: {
        width: '100%',
        height: deviceHeight * 0.6,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#FFFFFF',
        borderRadius: 30,
        borderWidth: 2,
        borderColor: '#B18FCF',
    },
    image: {
        width: '100%',
        height: deviceHeight * 0.6,
        borderRadius: 30,
    },
});

export default styles;