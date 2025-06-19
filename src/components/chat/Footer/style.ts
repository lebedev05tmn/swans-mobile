import { StyleSheet, Dimensions } from 'react-native';

const displayWidth = Dimensions.get('window').width;

const styles = StyleSheet.create({
    footer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-evenly',
        height: 100,
        paddingBottom: 24,
        backgroundColor: '#FFFFFF',
        bottom: 0,
    },
    input: {
        height: 36,
        borderRadius: 32,
        backgroundColor: '#F6F6F6',
        width: displayWidth * 0.65,
    },
    inputText: {
        color: '#FFF',
    },
    sendMessageButton: {
        height: 32,
        width: 32,
        borderRadius: '50%',
        backgroundColor: '#006CE0',
        alignItems: 'center',
        justifyContent: 'center',
    },
});

export default styles;
