import { StyleSheet, View, Text } from 'react-native';
import Button from '@/src/shared/ui/Button';
import useCreateProfileStore from '@/src/shared/stores/createProfile/store';

const SexInput = () => {
    const { toggleContent, next, setSex } = useCreateProfileStore(
        (state) => state.actions,
    );
    const isNextButtonDisabled = useCreateProfileStore(
        (state) => state.isNextButtonDisabled,
    );

    const handleSexPress = (sexValue: string) => {
        setSex(sexValue);
        toggleContent();
        next();
    };

    return (
        <View style={styles.buttonsWrap}>
            <Button
                onPress={() => handleSexPress('female')}
                disabled={isNextButtonDisabled}
            >
                <Text style={styles.text}>Женщина</Text>
            </Button>

            <Button
                onPress={() => handleSexPress('male')}
                disabled={isNextButtonDisabled}
            >
                <Text style={styles.text}>Мужчина</Text>
            </Button>
        </View>
    );
};

const styles = StyleSheet.create({
    buttonsWrap: {
        gap: 13,
    },
    text: {
        color: '#404040',
        fontWeight: '500',
        fontSize: 16,
        lineHeight: 19,
    },
});

export default SexInput;
