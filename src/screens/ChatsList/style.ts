import { StyleSheet, Dimensions } from 'react-native';

const displayWidth = Dimensions.get('window').width;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFFFFF',
    },
    flatList: {
        paddingHorizontal: displayWidth * 0.035,
        gap: 8,
        paddingVertical: 8,
    },
    flatListWrap: {
        flex: 1,
    },
});

export default styles;
