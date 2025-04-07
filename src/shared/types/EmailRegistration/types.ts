import Input from '@src/shared/ui/Input';

export type FormData = {
    email: string;
    code: string;
    password: string;
    confirmPassword: string;
    recoveryCode: string;
};

export interface InputFieldConfig {
    name: keyof FormData;
    label?: string;
    placeholder: string;
    inputMode?: React.ComponentProps<typeof Input>['inputMode'];
    maxLength?: number;
    secureTextEntry?: boolean;
    editable?: boolean;
}

export type HandlerState = {
    step: number;
    formData: FormData;
    sessionId: string | null;
    canResend: boolean;
};
export type HandlerSetters = {
    setStep: React.Dispatch<React.SetStateAction<number>>;
    setFormData: React.Dispatch<React.SetStateAction<FormData>>;
    setSessionId: React.Dispatch<React.SetStateAction<string | null>>;
    setResendTimer: React.Dispatch<React.SetStateAction<number>>;
    setCanResend: React.Dispatch<React.SetStateAction<boolean>>;
};
// Тип возвращаемого объекта (экспортируем, т.к. нужен в компоненте)
export type EmailRegistrationHandlers = {
    handleNext: () => Promise<void>;
    handleResendCode: () => Promise<void>;
    handleForgotPassword: () => void;
    handleChange: (name: keyof FormData, value: string) => void;
};
