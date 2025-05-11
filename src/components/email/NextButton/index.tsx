import React, { FC } from 'react';
import { Text } from 'react-native';
import { ArrowRight } from 'lucide-react-native';
import Button from '@/src/shared/ui/Button';
import { useEmailAuthStore, TEmailAuthStore } from '@/src/shared/stores/useEmailAuthStore';
import useValidateField from '@/src/shared/hooks/useValidateField';
import data from '@/datac.json';
import styles from './style';

interface NextButtonProps {
  onPress: () => void;
}

const NextButton: FC<NextButtonProps> = ({ onPress }) => {
  const setErrorMessage = useEmailAuthStore((state: TEmailAuthStore) => state.actions.setErrorMessage);
  const isNextButtonDisabled = useEmailAuthStore((state: TEmailAuthStore) => state.isNextButtonDisabled);
  const currentIndex = useEmailAuthStore((state: TEmailAuthStore) => state.currentIndex);
  const form = useEmailAuthStore((state: TEmailAuthStore) => state.form);

  const handleClick = () => {
    const fields = data[currentIndex]?.fields || [];
    let validationError = '';

    
    if (currentIndex === 2) {
      if (form.password !== form.confirmPassword) {
        validationError = 'Пароли не совпадают';
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