import { create } from 'zustand';
import data from '@/datac.json';

export type FormData = {
    email: string;
    code: string;
    password: string;
    confirmPassword: string;
    recoveryCode: string;
};

export type Timer = {
    seconds: number;
    canResend: boolean;
};

export type EmailAuthStore = {
    currentIndex: number;
    nextIndex: number;
    pages: number;
    form: FormData;
    errorMessage: string;
    isNextButtonDisabled: boolean;
    passwordVisibility: {
        password: boolean;
        confirmPassword: boolean;
        recoveryCode: boolean;
    };
    timers: Record<number, Timer>;
    isInitialRender: boolean;
    actions: {
        next: () => void;
        handleForgotPassword: () => void;
        setFormField: (field: keyof FormData, value: string) => void;
        togglePasswordVisibility: (
            field: 'password' | 'confirmPassword' | 'recoveryCode',
        ) => void;
        setErrorMessage: (error: string) => void;
        changeCurrentIndex: () => void;
        completeInitialRender: () => void;
        manageTimer: (
            stepId: number,
            action: 'start' | 'tick' | 'clear',
            duration?: number,
        ) => void;
        resetForm: () => void;
    };
};

export type TEmailAuthStore = EmailAuthStore;

const initialState: Omit<EmailAuthStore, 'actions'> = {
    currentIndex: 0,
    nextIndex: 0,
    pages: data.length,
    form: {
        email: '',
        code: '',
        password: '',
        confirmPassword: '',
        recoveryCode: '',
    },
    errorMessage: '',
    isNextButtonDisabled: false,
    passwordVisibility: {
        password: true,
        confirmPassword: true,
        recoveryCode: true,
    },
    timers: {},
    isInitialRender: true,
};

export const useEmailAuthStore = create<TEmailAuthStore>((set, get) => ({
    ...initialState,
    actions: {
        next: () => {
            const { nextIndex, pages } = get();
            if (nextIndex < pages - 1) {
                console.log(
                    'useEmailAuthStore: next called, moving to nextIndex=',
                    nextIndex + 1,
                );
                set({
                    nextIndex: nextIndex + 1,
                    errorMessage: '',
                    form: {
                        ...get().form,
                        code: nextIndex === 1 ? '' : get().form.code,
                        password: nextIndex === 2 ? '' : get().form.password,
                        confirmPassword:
                            nextIndex === 2 ? '' : get().form.confirmPassword,
                        recoveryCode:
                            nextIndex === 5 ? '' : get().form.recoveryCode,
                    },
                });
            } else if (nextIndex === pages - 1) {
                console.log(
                    'useEmailAuthStore: next called, moving from step 6 to step 4',
                );
                set({
                    nextIndex: 3,
                    errorMessage: '',
                    form: {
                        ...get().form,
                        password: '',
                        recoveryCode: '',
                        confirmPassword: '',
                    },
                });
            }
        },
        handleForgotPassword: () => {
            console.log(
                'useEmailAuthStore: handleForgotPassword called, moving to step 5',
            );
            set({
                nextIndex: 4,
                errorMessage: '',
                form: {
                    ...get().form,
                    recoveryCode: '',
                    password: '',
                    confirmPassword: '',
                },
            });
        },
        setFormField: (field, value) =>
            set((state) => ({
                form: { ...state.form, [field]: value },
                errorMessage: '',
            })),
        togglePasswordVisibility: (field) =>
            set((state) => ({
                passwordVisibility: {
                    ...state.passwordVisibility,
                    [field]: !state.passwordVisibility[field],
                },
            })),
        setErrorMessage: (error) => set({ errorMessage: error }),
        changeCurrentIndex: () =>
            set((state) => {
                console.log(
                    'useEmailAuthStore: changeCurrentIndex, setting currentIndex=',
                    state.nextIndex,
                );
                return { currentIndex: state.nextIndex };
            }),
        completeInitialRender: () => set({ isInitialRender: false }),
        manageTimer: (stepId, action, duration) => {
            if (action === 'start' && duration) {
                set((state) => ({
                    timers: {
                        ...state.timers,
                        [stepId]: { seconds: duration, canResend: false },
                    },
                }));
            } else if (action === 'tick') {
                set((state) => {
                    const timer = state.timers[stepId];
                    if (!timer || timer.seconds <= 1) {
                        return {
                            timers: {
                                ...state.timers,
                                [stepId]: { seconds: 0, canResend: true },
                            },
                        };
                    }
                    return {
                        timers: {
                            ...state.timers,
                            [stepId]: {
                                seconds: timer.seconds - 1,
                                canResend: false,
                            },
                        },
                    };
                });
            } else if (action === 'clear') {
                set((state) => {
                    const newTimers = { ...state.timers };
                    delete newTimers[stepId];
                    return { timers: newTimers };
                });
            }
        },
        resetForm: () =>
            set({
                form: {
                    email: '',
                    code: '',
                    password: '',
                    confirmPassword: '',
                    recoveryCode: '',
                },
                errorMessage: '',
            }),
    },
}));
