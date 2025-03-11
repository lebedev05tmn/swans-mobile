import Button from '@shared/ui/Button';
import useCreateProfileStore from '@stores/useCreateProfileStore';
import { Text, View } from 'react-native';
import styles from './style';
import { FC } from 'react';

const SexInput: FC = () => {
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


export default SexInput;
