import { Pressable, StyleSheet, Text, View } from 'react-native';
import useContentSwitcher from '@/src/pages/CreateProfilePage/store';
import ArrowRightIcon from '@/assets/svg/arrowRightIcon.svg';

const CountinueButton = () => {
    const next = useContentSwitcher((state) => state.next);
    const isCountinueButtonDisabled = useContentSwitcher((state) => state.isCountinueButtonDisabled);

    return (
        <Pressable style={styles.countinueButton} onPress={next} disabled={isCountinueButtonDisabled}>
            <Text style={styles.text}>Продолжить</Text>
            <ArrowRightIcon />
        </Pressable>
    );
};

const styles = StyleSheet.create({
    countinueButton: {
        height: 50,
        width: '100%',
        flexDirection: 'row',
        gap: 8,
        backgroundColor: '#EDEDED',
        borderRadius: 16,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 28,
    },
    text: {
        color: '#404040',
        fontWeight: 500,
        fontSize: 16,
        lineHeight: 19,
    },
});

export default CountinueButton;
