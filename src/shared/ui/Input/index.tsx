// src/shared/ui/Input/index.tsx (или твой путь)

import React, { forwardRef } from 'react';
import { InputModeOptions, TextInput, View, ViewStyle } from 'react-native';
import styles from './styles'; // Убедись, что стили импортируются правильно

// --- ДОБАВЛЯЕМ editable и secureTextEntry В ТИП ---
type TInput = {
    style?: ViewStyle;
    textStyle?: any;
    placeholder?: string;
    placeholderTextColor?: string;
    inputMode?: InputModeOptions;
    textAlign?: any;
    maxLength?: number;
    multiline?: boolean;
    textAlignVertical?: any;
    value?: string;
    key?: number | string;
    onChange?: (e: any) => void;
    onChangeText?: (text: string) => void;
    onFocus?: () => void;
    onSubmitEditing?: () => void;
    onBlur?: () => void;
    // --- ВОТ ОНИ ---
    editable?: boolean; // Добавлено
    secureTextEntry?: boolean; // Добавлено
    // --- КОНЕЦ ДОБАВЛЕНИЙ В ТИП ---
};

// Используем forwardRef для правильной передачи ref
const Input = forwardRef<TextInput, TInput>(
    (
        {
            style,
            placeholder,
            placeholderTextColor,
            inputMode,
            textStyle,
            textAlign,
            maxLength,
            multiline,
            textAlignVertical,
            value,
            key,
            onChange,
            onChangeText,
            onFocus,
            onSubmitEditing,
            onBlur,
            // --- ДЕСТРУКТУРИРУЕМ НОВЫЕ ПРОПСЫ ---
            editable, // Добавлено
            secureTextEntry, // Добавлено
            // --- КОНЕЦ ДЕСТРУКТУРИЗАЦИИ ---
        },
        ref,
    ) => {
        return (
            <View style={{ ...styles.inputView, ...style }}>
                <TextInput
                    style={{ ...styles.textInput, ...textStyle }}
                    placeholder={placeholder ?? 'Введите текст'}
                    placeholderTextColor={placeholderTextColor ?? '#A3A3A3'}
                    inputMode={inputMode ?? 'text'}
                    textAlign={textAlign}
                    textAlignVertical={textAlignVertical ?? 'center'}
                    maxLength={maxLength}
                    multiline={multiline}
                    value={value}
                    key={key}
                    ref={ref}
                    onChange={onChange}
                    onChangeText={onChangeText}
                    onFocus={onFocus}
                    onSubmitEditing={onSubmitEditing}
                    onBlur={onBlur}
                    // --- ПЕРЕДАЕМ ПРОПСЫ ВНУТРЬ TextInput ---
                    editable={editable} // Добавлено
                    secureTextEntry={secureTextEntry} // Добавлено
                    // --- КОНЕЦ ПЕРЕДАЧИ ПРОПСОВ ---
                />
            </View>
        );
    },
);

Input.displayName = 'Input'; // Хорошая практика для forwardRef

export default Input;
