import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    card: {
        backgroundColor: '#fff',
        padding: 16,
        borderRadius: 12,
        shadowColor: '#000',
        shadowOpacity: 0.1,
        shadowRadius: 4,
    },
    title: {
        fontSize: 12,
        lineHeight: 14,
        fontFamily: 'MontserratAlternates-SemiBold',
        marginBottom: 8,
        color: '#444444',
    },
    interestsContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: 8,
    },
    interest: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#F0F0F0',
        borderRadius: 20,
        paddingVertical: 6,
        paddingHorizontal: 12,
    },
    selectedInterest: {
        backgroundColor: '#000',
    },
    interestText: {
        marginLeft: 6,
        fontSize: 14,
        fontWeight: '500',
    },
    selectedText: {
        color: '#fff',
    },
    pressedStyle: {
        opacity: 0.6,
        transform: [{ scale: 0.95 }],
    },
});

export default styles;
