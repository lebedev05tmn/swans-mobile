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
        top: 10,
        flexDirection: 'row',
        justifyContent: 'center',
        alignSelf: 'center',
        gap: 8,
    },
    indicator: {
        width: 16,
        height: 6,
        borderRadius: 3,
    },
});

export default styles;