import { Text } from 'react-native';
import { FC } from 'react';
import Button from '@shared/ui/Button';
import useCreateProfileStore from '@stores/useCreateProfileStore';
import useUploadImages from '@hooks/useUploadImages';
import { createProfile } from '@config/profileApi';
import styles from './style';

const SubmitButton: FC = () => {
    const form = useCreateProfileStore((state) => state.form);

    const handleClick = async () => {
        const images = await useUploadImages(form.images);
        const result = { ...form, images: images };
        const { user_id, ...rest } = result;
        const response = await createProfile(user_id, rest);
    };

    return (
        <Button onPress={handleClick} style={styles.button}>
            <Text style={styles.text}>Создать профиль</Text>
        </Button>
    );
};

export default SubmitButton;
