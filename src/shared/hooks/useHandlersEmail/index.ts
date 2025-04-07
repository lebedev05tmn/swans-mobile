import { Alert } from 'react-native';

import { FormData } from '@src/shared/types/EmailRegistration/types'; // УКАЖИ ПРАВИЛЬНЫЙ ПУТЬ
import { EmailRegistrationHandlers } from '@src/shared/types/EmailRegistration/types';
import {
    sendCode,
    verifyCode,
    createUser,
    sendNewPassword,
} from '@src/shared/config/emailApi'; // УКАЖИ ПРАВИЛЬНЫЙ ПУТЬ

import {
    HandlerState,
    HandlerSetters,
} from '@src/shared/types/EmailRegistration/types';

const MOCK_DELAY = 300;
const fakeVerifyRecoveryCode = async (
    email: string,
    recoveryCode: string,
): Promise<any> => {
    console.log(
        '[MOCK API] fakeVerifyRecoveryCode called (handler file):',
        email,
        recoveryCode,
    );
    await new Promise((resolve) => setTimeout(resolve, MOCK_DELAY));
    return { success: true };
};
const fakeLogin = async (email: string, password: string): Promise<any> => {
    console.log('[MOCK API] fakeLogin called (handler file):', email, password);
    await new Promise((resolve) => setTimeout(resolve, MOCK_DELAY));
    return { success: true, message: 'Успешный вход (заглушка)!' };
};

export const setupEmailRegistrationHandlers = (
    state: HandlerState,
    setters: HandlerSetters,
): EmailRegistrationHandlers => {
    const handleNext = async () => {
        try {
            if (state.step === 1) {
                const response = await sendCode(state.formData.email);

                console.log(
                    'API Response (sendCode):',
                    JSON.stringify(response, null, 2),
                );

                if (
                    response?.success === false &&
                    (response?.error === 'User with this email alredy exist!' ||
                        response?.message ===
                            'User with this email alredy exist!')
                ) {
                    console.log('User exists detected, navigating to step 4.');
                    setters.setStep(4); // Используем сеттер
                    setters.setSessionId(null); // Используем сеттер
                } else if (response?.success && response.sessionId) {
                    console.log(
                        'Code sent successfully, navigating to step 2.',
                    );
                    setters.setSessionId(response.sessionId); // Используем сеттер
                    setters.setStep(2); // Используем сеттер
                    // Сброс таймера происходит через сеттеры ниже
                    setters.setResendTimer(60);
                    setters.setCanResend(false);
                } else {
                    const errorMessage =
                        response?.error ||
                        response?.message ||
                        'Не удалось отправить код.';
                    console.log('Other error occurred:', errorMessage);
                    Alert.alert('Ошибка', errorMessage);
                }
            }
            // Остальные шаги (2, 3, 5 - реальные API; 4, 6 - моки)
            else if (state.step === 2) {
                if (!state.sessionId) {
                    Alert.alert('Ошибка', 'Отсутствует ID сессии.');
                    setters.setStep(1);
                    return;
                }
                const response = await verifyCode(
                    state.sessionId,
                    state.formData.code,
                );
                if (response?.success) {
                    setters.setStep(3);
                } else {
                    Alert.alert('Ошибка', response?.error || 'Неверный код.');
                }
            } else if (state.step === 3) {
                if (
                    state.formData.password !== state.formData.confirmPassword
                ) {
                    Alert.alert('Ошибка', 'Пароли не совпадают');
                    return;
                }
                if (!state.sessionId) {
                    Alert.alert('Ошибка', 'Отсутствует ID сессии.');
                    setters.setStep(1);
                    return;
                }
                const response = await createUser(
                    state.sessionId,
                    state.formData.password,
                );
                if (response?.success) {
                    Alert.alert(
                        'Успех',
                        'Регистрация завершена! Теперь вы можете войти.',
                    );
                    setters.setStep(4);
                    setters.setSessionId(null);
                } else {
                    Alert.alert(
                        'Ошибка',
                        response?.error || 'Не удалось создать пользователя.',
                    );
                }
            } else if (state.step === 4) {
                console.warn('[UI] Используется fakeLogin (заглушка)');
                const response = await fakeLogin(
                    state.formData.email,
                    state.formData.password,
                );
                if (response.success) {
                    Alert.alert('Вход (Mock)', response.message); /* TODO */
                } else {
                    Alert.alert(
                        'Ошибка входа (Mock)',
                        response.error || 'Неверные данные.',
                    );
                }
            } else if (state.step === 5) {
                const response = await sendNewPassword(state.formData.email);
                if (response?.success) {
                    Alert.alert(
                        'Проверьте почту',
                        'Код для сброса пароля отправлен.',
                    );
                    setters.setStep(6);
                } else {
                    Alert.alert(
                        'Ошибка',
                        response?.error || 'Не удалось отправить.',
                    );
                }
            } else if (state.step === 6) {
                console.warn(
                    '[UI] Используется fakeVerifyRecoveryCode (заглушка)',
                );
                const response = await fakeVerifyRecoveryCode(
                    state.formData.email,
                    state.formData.recoveryCode,
                );
                if (response.success) {
                    Alert.alert(
                        'Успех (Mock)',
                        'Код верный. Теперь можете войти (возможно, новым паролем).',
                    );
                    setters.setStep(4);
                    setters.setFormData((prev) => ({
                        ...prev,
                        password: '',
                        code: '',
                        recoveryCode: '',
                        confirmPassword: '',
                    }));
                } else {
                    Alert.alert(
                        'Ошибка (Mock)',
                        response.error || 'Неверный код восстановления.',
                    );
                }
            }
        } catch (error: any) {
            console.error(
                '[UI] Неперехваченная UI ошибка в handleNext:',
                error,
            );
            const message = error.message || 'Произошла непредвиденная ошибка.';
            Alert.alert('Системная ошибка', message);
        }
    };

    const handleResendCode = async () => {
        if (state.step === 2 && state.canResend && state.formData.email) {
            setters.setResendTimer(60);
            setters.setCanResend(false);
            try {
                const response = await sendCode(state.formData.email);
                if (response?.success) {
                    if (response.sessionId)
                        setters.setSessionId(response.sessionId);
                    Alert.alert(
                        'Повторная отправка',
                        'Код отправлен повторно.',
                    );
                } else {
                    const errorMessage =
                        response?.error || 'Не удалось повторно отправить код.';
                    Alert.alert('Ошибка', errorMessage);
                    setters.setResendTimer(10);
                    setters.setCanResend(true);
                }
            } catch (error: any) {
                const message = error.message || 'Не удалось выполнить запрос.';
                Alert.alert('Ошибка сети', message);
                setters.setResendTimer(10);
                setters.setCanResend(true);
            }
        }
    };

    const handleForgotPassword = () => {
        setters.setStep(5);
        setters.setFormData((prev) => ({
            ...prev,
            code: '',
            password: '',
            confirmPassword: '',
            recoveryCode: '',
        }));
        setters.setSessionId(null);
        setters.setResendTimer(60);
        setters.setCanResend(false);
    };

    const handleChange = (name: keyof FormData, value: string) => {
        setters.setFormData((prev) => ({ ...prev, [name]: value }));
    };

    return {
        handleNext,
        handleResendCode,
        handleForgotPassword,
        handleChange,
    };
};
