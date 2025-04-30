import { forwardRef } from 'react';
import {
    StyleSheet,
    TextInput,
    TextInputProps,
    View,
    ViewStyle,
} from 'react-native';
import styles from './style';

type TInput = { viewStyle?: ViewStyle } & TextInputProps;

const Input = forwardRef<TextInput, TInput>(
    (
        {
            style,
            placeholder,
            placeholderTextColor,
            textAlignVertical,
            viewStyle,
            ...props
        },
        ref,
    ) => {
        const flattenedStyle = StyleSheet.flatten([styles.textInput, style]);
        const flattenedViewStyle = StyleSheet.flatten([
            styles.inputView,
            viewStyle,
        ]);

        return (
            <View style={flattenedViewStyle}>
                <TextInput
                    {...props}
                    style={flattenedStyle}
                    placeholder={placeholder ?? 'Введите текст'}
                    placeholderTextColor={placeholderTextColor ?? '#A3A3A3'}
                    textAlignVertical={textAlignVertical ?? 'center'}
                    ref={ref}
                />
            </View>
        );
    },
);

export default Input;
