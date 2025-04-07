import { InputFieldConfig } from '@src/shared/types/EmailRegistration/types';

export const stepInputConfig: Record<number, InputFieldConfig[]> = {
    // Конфигурация полей без изменений
    1: [
        {
            name: 'email',
            label: 'Почта',
            placeholder: 'example@email.ru',
            inputMode: 'email',
        },
    ],
    2: [
        {
            name: 'email',
            label: 'Почта',
            placeholder: 'example@email.ru',
            inputMode: 'email',
            editable: false,
        },
        {
            name: 'code',
            placeholder: 'Код с почты',
            inputMode: 'numeric',
            maxLength: 6,
        },
    ],
    3: [
        {
            name: 'email',
            label: 'Почта',
            placeholder: 'example@email.ru',
            inputMode: 'email',
            editable: false,
        },
        {
            name: 'password',
            label: 'Создание пароля',
            placeholder: 'Пароль',
            secureTextEntry: true,
        },
        {
            name: 'confirmPassword',
            placeholder: 'Повторите пароль',
            secureTextEntry: true,
        },
    ],
    4: [
        {
            name: 'email',
            label: 'Почта',
            placeholder: 'example@email.ru',
            inputMode: 'email',
        },
        { name: 'password', placeholder: 'Пароль', secureTextEntry: true },
    ],
    5: [
        {
            name: 'email',
            label: 'Почта',
            placeholder: 'example@email.ru',
            inputMode: 'email',
        },
    ],
    6: [
        {
            name: 'email',
            label: 'Почта',
            placeholder: 'example@email.ru',
            inputMode: 'email',
            editable: false,
        },
        {
            name: 'recoveryCode',
            label: 'Введите пароль',
            placeholder: 'Пароль с почты',
            inputMode: 'text',
        },
    ],
};
