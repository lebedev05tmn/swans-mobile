import { Pressable, StyleSheet, Text, View } from 'react-native';
import useContentSwitcher from '@/pages/CreateProfilePage/store';
import ArrowRightIcon from '@/assets/svg/arrowRightIcon.svg';

const CountinueButton = () => {
    const next = useContentSwitcher(state => state.next)
    return (
        <Pressable onPress={next}>
            <View style={styles.countinueButton}>
                <Text style={styles.text}>Продолжить</Text>
                <ArrowRightIcon />
            </View>
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
