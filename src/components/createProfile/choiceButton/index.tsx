import { StyleSheet, View, Text } from 'react-native';
import Button from '@/src/shared/ui/Button';
import useCreateProfileStore from '@/src/shared/stores/createProfile/store';
import { ANIMATION_TIME } from '@/src/shared/config/config';

const ButtonChoice = () => {
    const { toggleContent } = useCreateProfileStore((state) => state.actions);

    return (
        <View style={styles.buttonsWrap}>
            <Button onPress={toggleContent}>
                <Text style={styles.text}>Женщина</Text>
            </Button>

            <Button onPress={toggleContent}>
                <Text style={styles.text}>Мужчина</Text>
            </Button>
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
