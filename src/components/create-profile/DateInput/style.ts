import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    dateWrap: {
        flexDirection: 'row',
        width: '100%',
        gap: 10,
    },
    dateCell: {
        flex: 1,
        gap: 3,
    },
    dateCellInput: {
        alignItems: 'center',
        justifyContent: 'center',
    },
    dateCellText: {
        fontFamily: 'MontserratAlternates_600SemiBold',
        color: '#fff',
        fontSize: 14,
        textAlign: 'center',
    },
});

export default styles;