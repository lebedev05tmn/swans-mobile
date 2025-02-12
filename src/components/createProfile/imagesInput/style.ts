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
        overflow: 'hidden',
    },
    managmentButtons: {
        position: 'absolute',
        bottom: 25,
        flexDirection: 'row',
        gap: 30,
    },
    managmentButton: {
        backgroundColor: '#FFFFFF',
        borderRadius: '50%',
        width: 50,
        height: 50,
    },
});

export default styles;