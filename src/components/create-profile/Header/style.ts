import { StyleSheet, Dimensions } from 'react-native';

const displayWidth = Dimensions.get('window').width;

const styles = StyleSheet.create({
    header: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        height: 'auto',
        width: '100%',
        marginVertical: 28,
        marginTop: 40,
    },
    progress: {
        position: 'absolute',
        left: displayWidth * 0.15,
    },
});

export default styles;
