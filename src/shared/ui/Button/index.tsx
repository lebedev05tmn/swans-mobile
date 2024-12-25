import { Pressable, PressableProps, ViewStyle } from 'react-native';
import styles from './styles';

type TButton = {
    children: React.ReactNode;
    customStyles?: ViewStyle;
    disabled?: boolean;
    onPress?: PressableProps['onPress'];
};

const Button = ({ children, customStyles, onPress, disabled }: TButton) => {
    return (
        <Pressable
            onPress={onPress}
            disabled={disabled}
            style={{ ...styles.button, ...customStyles }}
        >
            {children}
        </Pressable>
    );
};

export default Button;
