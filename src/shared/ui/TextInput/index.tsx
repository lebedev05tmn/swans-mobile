import { InputModeOptions, TextInput, ViewStyle } from "react-native";
import styles from "./styles";

type InputProps = {
    customStyles?: ViewStyle;
    placeholder?: string;
    placeholderTextColor?: string;
    inputMode?: InputModeOptions;
}

const Input = ({ customStyles, placeholder, placeholderTextColor, inputMode }: InputProps) => {
    return (
        <TextInput
            style={{ ...styles.textInput, ...customStyles }}
            placeholder={placeholder || 'Введите текст'}
            placeholderTextColor={placeholderTextColor || '#A3A3A3'}
            inputMode={inputMode || 'text'}
        />
    );
};

export default Input;

