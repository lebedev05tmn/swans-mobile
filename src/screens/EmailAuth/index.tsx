import React, { useEffect } from 'react';
import { View, Text } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import {
    useEmailAuthStore,
    TEmailAuthStore,
} from '@/src/shared/stores/useEmailAuthStore';
import Header from '@/src/components/email/header';
import Slider from '@/src/components/email/slider';
import InputsContainer from '@/src/components/email/inputs-container';
import Link from '@/src/components/email/link';
import NextButton from '@/src/components/email/NextButton';
import data from '@/datac.json';
import styles from './style';
import { emailRegistration } from '@/src/shared/hooks/serverRequests/email';

const EmailRegistration: React.FC = () => {
    const insets = useSafeAreaInsets();
    const {
        next,
        handleForgotPassword,
        changeCurrentIndex,
        handleSendCode,
        handleVerifyCode,
        disableNextButton,
        enableNextButton,
        setErrorMessage,
    } = useEmailAuthStore((state: TEmailAuthStore) => state.actions);
    const currentIndex = useEmailAuthStore(
        (state: TEmailAuthStore) => state.currentIndex,
    );
    const nextIndex = useEmailAuthStore(
        (state: TEmailAuthStore) => state.nextIndex,
    );
    const errorMessage = useEmailAuthStore(
        (state: TEmailAuthStore) => state.errorMessage,
    );
    const isNextButtonDisabled = useEmailAuthStore(
        (state: TEmailAuthStore) => state.isNextButtonDisabled,
    );
    const verificationCode = useEmailAuthStore(
        (state: TEmailAuthStore) => state.form.code,
    );

    const handleNext = () => {
        if (!isNextButtonDisabled) next();
    };

    const handleForgotPasswordPress = () => {
        handleForgotPassword();
    };

    const handleAnimationComplete = () => {
        changeCurrentIndex();
    };

    const step = data[currentIndex] || {};

    useEffect(() => {
        console.log(`Current index ${currentIndex}`);
        if (currentIndex === 1) {
            console.log('Код отправлен');
            disableNextButton();
            handleSendCode();
        }
    }, [currentIndex]);

    useEffect(() => {
        const verify = async () => {
            disableNextButton();
            console.log('Проверка кода');
            const response = await handleVerifyCode();
            console.log(response);
            if (response) {
                enableNextButton();
                setErrorMessage('');
                next();
            } else {
                setErrorMessage('Неверный код');
            }
        };

        if (verificationCode.length === 6) verify();
    }, [verificationCode]);

    return (
        <LinearGradient
            colors={['#B18FCF', '#87CEEB']}
            style={styles.container}
        >
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
                {errorMessage && (
                    <Text style={styles.errorText}>{errorMessage}</Text>
                )}
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
