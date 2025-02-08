import Input from '@/src/shared/ui/Input';
import { StyleSheet } from 'react-native';
import createProfileStore from '@/src/shared/stores/createProfile/store';

const LongDescriptionInput = () => {
    const longDescription = createProfileStore((state) => state.form.long_desc);
    const setLongDescription = createProfileStore(
        (state) => state.actions.setLongDesc,
    );
    const setErrorMessage = createProfileStore(
        (state) => state.actions.setErrorMessage,
    );

    return (
        <Input
            style={styles.aboutTextInput}
            placeholder="Напиши текст до 120 символов..."
            onChangeText={(text) => {
                setLongDescription(text);
                setErrorMessage('');
            }}
            value={longDescription}
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
