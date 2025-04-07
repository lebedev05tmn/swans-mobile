import React, { useState, useEffect, useMemo, useRef } from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    Keyboard,
    Dimensions,
    Animated,
    Easing,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { ArrowRight } from 'lucide-react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Button from '@shared/ui/Button';
import Input from '@src/shared/ui/Input';
import styles from './styles';

import { FormData } from '@src/shared/types/EmailRegistration/types';

import { stepInputConfig } from '@src/shared/data/EmailRegistration/emailRegistration';

import { setupEmailRegistrationHandlers } from '@src/shared/hooks/useHandlersEmail';

import { InputFieldConfig } from '@src/shared/types/EmailRegistration/types';

const { width: screenWidth } = Dimensions.get('window');
const ANIMATION_DURATION = 300;

// Основной компонент
const EmailRegistration = () => {
    const [step, setStep] = useState<number>(1);
    const previousStepRef = useRef<number>(step);
    const insets = useSafeAreaInsets();
    const statusBarHeight = insets.top;
    const [formData, setFormData] = useState<FormData>({
        email: '',
        code: '',
        password: '',
        confirmPassword: '',
        recoveryCode: '',
    });
    const [isKeyboardVisible, setIsKeyboardVisible] = useState<boolean>(false);
    const [resendTimer, setResendTimer] = useState<number>(60);
    const [canResend, setCanResend] = useState<boolean>(false);
    const [sessionId, setSessionId] = useState<string | null>(null);
    const translateXAnim = useRef(new Animated.Value(0)).current;

    const handlerState = { step, formData, sessionId, canResend };
    const handlerSetters = {
        setStep,
        setFormData,
        setSessionId,
        setResendTimer,
        setCanResend,
    };

    const handlers = useMemo(
        () => setupEmailRegistrationHandlers(handlerState, handlerSetters),
        [step, formData, sessionId, canResend],
    );

    useEffect(() => {
        const showListener = Keyboard.addListener('keyboardDidShow', () =>
            setIsKeyboardVisible(true),
        );
        const hideListener = Keyboard.addListener('keyboardDidHide', () =>
            setIsKeyboardVisible(false),
        );
        return () => {
            showListener.remove();
            hideListener.remove();
        };
    }, []);
    useEffect(() => {
        let interval: NodeJS.Timeout | null = null;
        if (step === 2 && resendTimer > 0) {
            setCanResend(false); // Управляем состоянием здесь
            interval = setInterval(
                () => setResendTimer((prev) => prev - 1),
                700,
            );
        } else if (step === 2 && resendTimer <= 0) {
            setCanResend(true); // Управляем состоянием здесь
        } else {
            // Как и было в твоем коде, сброса нет здесь, он в сеттерах
        }
        return () => {
            if (interval) clearInterval(interval);
        };
    }, [step, resendTimer]);
    useEffect(() => {
        const prevStep = previousStepRef.current;
        const currentStep = step;
        const isAnimatedTransition = (from: number, to: number): boolean => {
            const transitions = [
                [2, 3],
                [3, 4],
                [4, 5],
                [6, 4],
            ];
            return transitions.some(
                (t) =>
                    (t[0] === from && t[1] === to) ||
                    (t[1] === from && t[0] === to),
            );
        };
        if (isAnimatedTransition(prevStep, currentStep)) {
            const direction = currentStep > prevStep ? 1 : -1;
            const fromValue = direction * screenWidth;
            translateXAnim.setValue(fromValue);
            Animated.timing(translateXAnim, {
                toValue: 0,
                duration: ANIMATION_DURATION,
                easing: Easing.out(Easing.ease),
                useNativeDriver: true,
            }).start();
        } else {
            translateXAnim.setValue(0);
        }
        previousStepRef.current = step;
    }, [step, translateXAnim]);

    const getTitle = (): string => {
        if (step === 5 || step === 6) return 'Восстановление пароля';
        return 'Введите почту';
    };
    const getSubtitle = (): string => {
        return 'Используйте актуальную почту,\nна нее прийдет код.';
    };

    const currentFields = useMemo(() => stepInputConfig[step] || [], [step]);

    const animatedContainerStyle = [
        styles.animatedWrapperBase,
        { transform: [{ translateX: translateXAnim }] },
    ];

    return (
        <LinearGradient
            colors={['#B18FCF', '#87CEEB']}
            style={styles.container}
        >
            <View style={[styles.inner, { paddingTop: statusBarHeight }]}>
                <Animated.View style={animatedContainerStyle}>
                    {/* Используем локальные getTitle/getSubtitle */}
                    <Text style={styles.title}>{getTitle()}</Text>
                    <Text style={styles.subtitle}>{getSubtitle()}</Text>

                    <View style={styles.inputsContainer}>
                        {currentFields.map((field: InputFieldConfig) => (
                            <View key={field.name} style={styles.inputWrapper}>
                                {field.label && (
                                    <Text style={styles.inputLabel}>
                                        {field.label}
                                    </Text>
                                )}
                                <Input
                                    placeholder={field.placeholder}
                                    inputMode={field.inputMode}
                                    maxLength={field.maxLength}
                                    value={
                                        formData[field.name as keyof FormData]
                                    }
                                    onChangeText={(value) =>
                                        handlers.handleChange(field.name, value)
                                    }
                                    editable={field.editable !== false}
                                    secureTextEntry={field.secureTextEntry}
                                />
                            </View>
                        ))}
                        {step === 2 && (
                            <TouchableOpacity
                                onPress={handlers.handleResendCode}
                                disabled={!canResend}
                                style={styles.linkWrapper}
                            >
                                <Text
                                    style={[
                                        styles.link,
                                        !canResend && {
                                            textDecorationLine: 'none',
                                            color: 'grey',
                                        },
                                    ]}
                                >
                                    {canResend
                                        ? 'Запросить повторный код'
                                        : `Запросить повторный код\nчерез: ${resendTimer} сек...`}
                                </Text>
                            </TouchableOpacity>
                        )}
                        {step === 4 && (
                            <TouchableOpacity
                                onPress={handlers.handleForgotPassword}
                                style={styles.linkWrapper}
                            >
                                <Text style={styles.link}>Забыл пароль?</Text>
                            </TouchableOpacity>
                        )}
                    </View>
                </Animated.View>
            </View>

            {!isKeyboardVisible && (
                <View style={styles.buttonContainer}>
                    <Button
                        style={{ ...styles.button, width: '86.6%' }}
                        // ИСПОЛЬЗУЕМ ОБРАБОТЧИК ИЗ handlers
                        onPress={handlers.handleNext}
                    >
                        <>
                            <Text style={styles.buttonText}>Продолжить</Text>
                            <ArrowRight color={'#404040'} size={18} />
                        </>
                    </Button>
                </View>
            )}
        </LinearGradient>
    );
};

export default EmailRegistration;
