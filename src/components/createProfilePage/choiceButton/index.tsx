import { StyleSheet, View, Pressable, Text } from 'react-native';
import { useRouter } from 'expo-router';

type Props = {
    text: string;
};

const Btn: React.FC<Props> = ({ text }) => {
    const router = useRouter();
    return (
        <Pressable
            style={styles.button}
            onPress={() => {
                router.push('/choose');
            }}
        >
            <Text style={styles.text}>{text}</Text>
        </Pressable>
    );
};

const ButtonChoice = () => {
    return (
        <View style={styles.buttonsWrap}>
            <Btn text={'Мужчина'} />
            <Btn text={'Женщина'} />
        </View>
    );
};

const styles = StyleSheet.create({
    buttonsWrap: {
        gap: 13,
    },
    button: {
        height: 50,
        width: '100%',
        flexDirection: 'row',
        gap: 8,
        backgroundColor: '#EDEDED',
        borderRadius: 16,
        justifyContent: 'center',
        alignItems: 'center',
    },
    text: {
        color: '#404040',
        fontWeight: 500,
        fontSize: 16,
        lineHeight: 19,
    },
});

export default ButtonChoice;
