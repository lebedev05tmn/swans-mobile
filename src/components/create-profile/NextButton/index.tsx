import useValidateField from '@/src/shared/hooks/useValidateField';
import data from '@/data.json';
import Button from '@/src/shared/ui/Button';
import useCreateProfileStore from '@/src/shared/stores/useCreateProfileStore';
import { ArrowRight } from 'lucide-react-native';
import { Text } from 'react-native';
import styles from './style';
import { FC } from 'react';

enum ProfileFields {
    USERNAME = 0,
    CITY = 1,
    BIRTH_DATE = 2,
    DESCRIPTION = 3,
    IMAGES = 5,
}

const dataCreateProfileContent = JSON.parse(JSON.stringify(data));

const NextButton: FC = () => {
    const next = useCreateProfileStore((state) => state.actions.next);
    const setErrorMessage = useCreateProfileStore(
        (state) => state.actions.setErrorMessage,
    );
    const isNextButtonDisabled = useCreateProfileStore(
        (state) => state.isNextButtonDisabled,
    );
    const currentIndex = useCreateProfileStore((state) => state.currentIndex);
    const form = useCreateProfileStore((state) => state.form);

    const handleClick = () => {
        const fieldMap: Record<number, string | number> = {
            [ProfileFields.USERNAME]: form.user_name,
            [ProfileFields.CITY]: form.city,
            [ProfileFields.BIRTH_DATE]: form.birth_date,
            [ProfileFields.DESCRIPTION]: form.description,
            [ProfileFields.IMAGES]: form.images.length,
        };

        const value: string | number = fieldMap[currentIndex];

        const validationError = useValidateField(
            value,
            dataCreateProfileContent[currentIndex].validationRules,
        );

        setErrorMessage(validationError);

        if (!validationError) next();
    };

    return (
        <Button
            style={{
                ...styles.nextButton,
                ...(isNextButtonDisabled && styles.disabled),
            }}
            onPress={handleClick}
            disabled={isNextButtonDisabled}
        >
            <Text style={styles.text}>Продолжить</Text>
            <ArrowRight color={'#404040'} size={18} />
        </Button>
    );
};


export default NextButton;