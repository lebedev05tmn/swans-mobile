import Input from '@shared/ui/Input';
import useCreateProfileStore from '@stores/useCreateProfileStore';
import { FC } from 'react';
import styles from './style';

const LongDescriptionInput: FC = () => {
    const description = useCreateProfileStore(
        (state) => state.form.description,
    );
    const setDescription = useCreateProfileStore(
        (state) => state.actions.setDescription,
    );

    return (
        <Input
            style={styles.aboutTextInput}
            placeholder="Напиши текст до 120 символов..."
            onChangeText={setDescription}
            value={description}
            multiline={true}
            textAlignVertical={'top'}
        />
    );
};

export default LongDescriptionInput;
