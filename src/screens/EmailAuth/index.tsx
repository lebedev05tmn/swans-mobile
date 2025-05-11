import React from 'react';
import { View, Text } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useEmailAuthStore, TEmailAuthStore } from '@/src/shared/stores/useEmailAuthStore';
import Header from '@/src/components/email/header';
import Slider from '@/src/components/email/slider';
import InputsContainer from '@/src/components/email/inputs-container';
import Link from '@/src/components/email/link';
import NextButton from '@/src/components/email/NextButton';
import data from '@/datac.json';
import styles from './style';

const EmailRegistration: React.FC = () => {
  const insets = useSafeAreaInsets();
  const { next, handleForgotPassword, changeCurrentIndex, resetForm } = useEmailAuthStore(
    (state: TEmailAuthStore) => state.actions,
  );
  const currentIndex = useEmailAuthStore((state: TEmailAuthStore) => state.currentIndex);
  const nextIndex = useEmailAuthStore((state: TEmailAuthStore) => state.nextIndex);
  const errorMessage = useEmailAuthStore((state: TEmailAuthStore) => state.errorMessage);
  const isNextButtonDisabled = useEmailAuthStore((state: TEmailAuthStore) => state.isNextButtonDisabled);

  const handleNext = () => {
    if (isNextButtonDisabled) return;
    console.log('handleNext called, currentIndex:', currentIndex, 'nextIndex:', nextIndex, 'moving to:', nextIndex + 1);
    next();
  };

  const handleForgotPasswordPress = () => {
    console.log('handleForgotPassword called, currentIndex:', currentIndex, 'moving to:', 4);
    handleForgotPassword();
  };

  const handleAnimationComplete = () => {
    console.log('Animation complete, changing index to:', nextIndex);
    changeCurrentIndex();
    setTimeout(() => {
      console.log('UI interactivity enabled');
    }, 100);
  };

  const step = data[currentIndex] || {};

  const isReverseSlide = currentIndex === 3 && nextIndex === 3 && data[currentIndex - 1]?.id === 'recoverPassword';

  return (
    <LinearGradient colors={['#B18FCF', '#87CEEB']} style={styles.container}>
      <View style={[styles.inner, { paddingTop: insets.top }]}>
        <Slider
          currentIndex={currentIndex}
          nextIndex={nextIndex}
          onAnimationComplete={handleAnimationComplete}
          header={<Header />}
        >
          <InputsContainer />
          {step.link && (
            <Link
              linkData={step.link}
              currentIndex={currentIndex}
              onForgotPassword={handleForgotPasswordPress}
              changeCurrentIndex={changeCurrentIndex}
            />
          )}
        </Slider>
        {errorMessage && <Text style={styles.errorText}>{errorMessage}</Text>}
        {step.showNextButton && (
          <View style={styles.footer}>
            <NextButton onPress={handleNext} />
          </View>
        )}
      </View>
    </LinearGradient>
  );
};

export default EmailRegistration;