import { Pressable, PressableProps, ViewStyle } from 'react-native';
import styles from './styles';

type TButton = {
    children: React.ReactNode;
    style?: ViewStyle;
    disabled?: boolean;
    onPress?: PressableProps['onPress'];
};

const Button = ({ children, style, onPress, disabled }: TButton) => {
    return (
        <Pressable
            onPress={onPress}
            disabled={disabled}
            style={{ ...styles.button, ...style }}
        >
            {children}
        </Pressable>
    );
};

export default Button;
