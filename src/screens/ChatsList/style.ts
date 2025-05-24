import { StyleSheet, Dimensions } from 'react-native';

const displayWidth = Dimensions.get('window').width;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFFFFF',
        paddingHorizontal: displayWidth * 0.03,
    },
});

export default styles;
