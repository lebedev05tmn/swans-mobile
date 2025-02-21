import { Text } from 'react-native';
import React from 'react';
import Button from '@/src/shared/ui/Button';
import useCreateProfileStore from '@/src/shared/stores/useCreateProfileStore';
import useUploadImages from '@/src/shared/hooks/useUploadImages';
import { createProfile } from '@/src/shared/config/profileApi';
import { ArrowRight } from 'lucide-react-native';
import styles from './style';

const SubmitButton = () => {
    const form = useCreateProfileStore((state) => state.form);

    const handleClick = async () => {
        const images = await useUploadImages(form.images);
        const result = { ...form, images: images };
        const { user_id, ...rest } = result;
        await createProfile(user_id, rest);
    };
    return (
        <Button onPress={handleClick} style={styles.button}>
            <Text style={styles.text}>Продолжить</Text>
            <ArrowRight color={'#404040'} size={18} />
        </Button>
    );
};

export default SubmitButton;
