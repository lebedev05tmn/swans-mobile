import { InputModeOptions, StyleProp, TextInput, View, ViewStyle } from 'react-native';
import styles from './styles';

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
    ref?: any;
    onChange?: (e: any) => void;
    onFocus?: () => void;
    onSubmitEditing?: () => void;
};

const Input = ({
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
    ref,
    onChange,
    onFocus,
    onSubmitEditing,
}: TInput) => {
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
                onFocus={onFocus}
                onSubmitEditing={onSubmitEditing}
            />
        </View>
    );
};

export default Input;
