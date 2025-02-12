import { Dimensions, StyleSheet } from 'react-native';

const displayWidth = Dimensions.get('window').width;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: '100%',
    },
    touchableArea: {
        flex: 1,
        width: '100%',
    },
    image: {
        width: displayWidth * 0.86,
        height: '100%',
    },
    indicatorContainer: {
        position: 'absolute',
        top: 20,
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        alignSelf: 'center',
        gap: 20,
        width: displayWidth * 0.65,
    },
    indicator: {
        flex: 1,
        height: 4,
        borderRadius: 3,
        backgroundColor: '#FFFFFF',
        zIndex: 1,
    },
});

export default styles;
