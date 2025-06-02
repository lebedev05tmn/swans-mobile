import React, { FC } from 'react';
import { Alert, Text } from 'react-native';
import { ArrowRight } from 'lucide-react-native';
import Button from '@/src/shared/ui/Button';
import {
    useEmailAuthStore,
    TEmailAuthStore,
} from '@/src/shared/stores/useEmailAuthStore';
import useValidateField from '@/src/shared/hooks/useValidateField';
import data from '@/datac.json';
import styles from './style';
import { router } from 'expo-router';

interface NextButtonProps {
    onPress: () => void;
}

const NextButton: FC<NextButtonProps> = ({ onPress }) => {
    const { setErrorMessage, handleRegistration, handleLogin, next } =
        useEmailAuthStore((state: TEmailAuthStore) => state.actions);
    const isNextButtonDisabled = useEmailAuthStore(
        (state: TEmailAuthStore) => state.isNextButtonDisabled,
    );
    const currentIndex = useEmailAuthStore(
        (state: TEmailAuthStore) => state.currentIndex,
    );
    const form = useEmailAuthStore((state: TEmailAuthStore) => state.form);

    const handleClick = async () => {
        const fields = data[currentIndex]?.fields || [];
        let validationError = '';

        switch (currentIndex) {
            case 2:
                if (form.password !== form.confirmPassword) {
                    validationError = 'Пароли не совпадают';
                } else {
                    const registrationStatus = await handleRegistration();
                    if (registrationStatus) {
                        if (registrationStatus.responseCode === 200) {
                            if (registrationStatus.status === true) {
                                router.push('/matchmaking');
                            } else {
                                Alert.alert(
                                    'Срок вашей сессии истек, попробуйте еще раз!',
                                );
                                router.navigate('/auth');
                            }
                        } else {
                            Alert.alert('Вы уже зарегистрированы!');
                            next();
                        }
                    } else {
                        validationError =
                            'Что-то пошло не так, попробуйте еще раз';
                    }
                }
                break;
            case 3:
                if (form.email && form.password) {
                    const loginStatus = await handleLogin();
                    if (loginStatus) {
                        router.push('/matchmaking');
                    } else {
                        validationError = 'Неверный логин или пароль';
                    }
                } else {
                    validationError = 'Введите логин и пароль';
                }
        }

        if (!validationError) {
            for (const field of fields) {
                const value = form[field.valueKey as keyof typeof form];
                const rules = field.validationRules || [];
                validationError = useValidateField(value, rules);
                if (validationError) break;
            }
        }

        setErrorMessage(validationError);

        if (!validationError) onPress();
    };

    return (
        <Button
            style={styles.nextButton}
            onPress={handleClick}
            disabled={isNextButtonDisabled}
        >
            <Text style={styles.text}>Продолжить</Text>
            <ArrowRight color={'#404040'} size={18} />
        </Button>
    );
};

export default NextButton;
