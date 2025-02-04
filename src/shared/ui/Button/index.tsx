import { TouchableOpacity, ViewStyle } from 'react-native';
import styles from './styles';

type TButton = {
    children: React.ReactNode;
    style?: ViewStyle;
    disabled?: boolean;
    onPress?: () => void;
};

const Button = ({ children, style, onPress, disabled }: TButton) => {
    return (
        <TouchableOpacity
            onPress={onPress}
            disabled={disabled}
            activeOpacity={0.75}
            style={{
                ...styles.button,
                ...style,
                opacity: disabled ? 0.75 : 1,
                pointerEvents: disabled ? 'none' : 'auto',
            }}
        >
            {children}
        </TouchableOpacity>
    );
};

export default Button;
