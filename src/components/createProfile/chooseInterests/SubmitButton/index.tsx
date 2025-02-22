import { Text } from 'react-native';
import React from 'react';
import Button from '@/src/shared/ui/Button';
import useCreateProfileStore from '@/src/shared/stores/useCreateProfileStore';
import useUploadImages from '@/src/shared/hooks/useUploadImages';
import { createProfile } from '@/src/shared/config/profileApi';
import styles from './style';

const SubmitButton = () => {
    const form = useCreateProfileStore((state) => state.form);

    const handleClick = async () => {
        const images = await useUploadImages(form.images);
        const result = { ...form, images: images };
        const { user_id, ...rest } = result;
        const response = await createProfile(user_id, rest);
        console.log(response);
    };
    return (
        <Button onPress={handleClick} style={styles.button}>
            <Text style={styles.text}>Создать профиль</Text>
        </Button>
    );
};

export default SubmitButton;
