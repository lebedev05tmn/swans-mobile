import { Alert, Text } from 'react-native';
import React from 'react';
import Button from '@/src/shared/ui/Button';
import useCreateProfileStore from '@/src/shared/stores/useCreateProfileStore';

const SubmitButton = () => {
    const form = useCreateProfileStore((state) => state.form);

    return (
        <Button
            onPress={() => {
                Alert.alert('Форма', JSON.stringify(form));
            }}
        >
            <Text>Показать форму</Text>
        </Button>
    );
};

export default SubmitButton;
