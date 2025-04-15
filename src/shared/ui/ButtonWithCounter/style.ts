import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    button: {
        backgroundColor: '#FFFFFF',
        borderRadius: '50%',
        width: 50,
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
    },
    counter: {
        position: 'absolute',
        bottom: 0,
        right: 0,
        borderRadius: '50%',
        backgroundColor: '#333333',
        width: 15,
        height: 15,
        justifyContent: 'center',
        alignItems: 'center',
    },
    counterText: {
        color: '#FFFFFF',
        fontSize: 10,
        lineHeight: 12,
    },
});

export default styles;
