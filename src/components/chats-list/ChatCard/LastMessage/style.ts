import { StyleSheet, Dimensions } from 'react-native';

const deviceWidth = Dimensions.get('window').width;

const styles = StyleSheet.create({
    wrap: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        gap: 8,
    },
    unreadCountWrap: {
        height: 24,
        width: 24,
        backgroundColor: '#60A0FF',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: '50%',
    },
    unreadCount: {
        fontSize: 12,
        color: '#FFFFFF',
        fontFamily: 'MontserratAlternates-Medium',
    },
    lastMessage: {
        fontSize: 12,
        width: deviceWidth * 0.6,
        height: 34,
        color: '#454545',
        fontFamily: 'MontserratAlternates-Medium',
    },
});

export default styles;
