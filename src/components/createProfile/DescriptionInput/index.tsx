import Input from '@/src/shared/ui/Input';
import { StyleSheet } from 'react-native';
import createProfileStore from '@/src/shared/stores/useCreateProfileStore';

const LongDescriptionInput = () => {
    const description = createProfileStore((state) => state.form.description);
    const setDescription = createProfileStore(
        (state) => state.actions.setDescription,
    );
    const setErrorMessage = createProfileStore(
        (state) => state.actions.setErrorMessage,
    );

    return (
        <Input
            viewStyle={styles.aboutTextInput}
            placeholder="Напиши текст до 120 символов..."
            onChangeText={(text) => {
                setDescription(text);
                setErrorMessage('');
            }}
            value={description}
            multiline={true}
            textAlignVertical={'top'}
        />
    );
};

const styles = StyleSheet.create({
    aboutTextInput: {
        padding: 12,
        height: 96,
    },
});

export default LongDescriptionInput;
