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
            />
        </View>
    );
};

export default Input;
