import { Alert, StyleSheet, Text } from 'react-native';
import createProfileStore from '@/src/shared/stores/createProfile/store';
import { ArrowRight } from 'lucide-react-native';
import Button from '@/src/shared/ui/Button';
import useValidateField from '@/src/shared/hooks/useValidateField';
import dataCreateProfileContent from '@/src/shared/data/createProfile/data';

const NextButton = () => {
    const next = createProfileStore((state) => state.actions.next);
    const setErrorMessage = createProfileStore(
        (state) => state.actions.setErrorMessage,
    );
    const isNextButtonDisabled = createProfileStore(
        (state) => state.isNextButtonDisabled,
    );
    const currentIndex = createProfileStore((state) => state.currentIndex);
    const form = createProfileStore((state) => state.form);

    const handleClick = () => {
        let value;

        switch (currentIndex) {
            case 0:
                value = form.user_name;
                break;
            case 1:
                value = form.city;
                break;
            case 2:
                value = form.birth_date;
                break;
            case 3:
                value = form.long_desc;
                break;
            case 5:
                value = form.images.length;
                break;
        }

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

const styles = StyleSheet.create({
    nextButton: {
        gap: 8,
    },
    disabled: {
        opacity: 0.75,
    },
    text: {
        color: '#404040',
        fontWeight: 500,
        fontSize: 16,
        lineHeight: 16,
    },
});

export default NextButton;
