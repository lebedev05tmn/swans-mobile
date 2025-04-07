import React, { useState, useEffect, useMemo, useRef } from 'react';
import { Dimensions } from 'react-native';

import { FormData } from '@src/shared/types/EmailRegistration/types';
import Input from '@src/shared/ui/Input';

export interface InputFieldConfig {
    name: keyof FormData;
    label?: string;
    placeholder: string;
    inputMode?: React.ComponentProps<typeof Input>['inputMode'];
    maxLength?: number;
    secureTextEntry?: boolean;
    editable?: boolean;
}
export const stepInputConfig: Record<number, InputFieldConfig[]> = {
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
