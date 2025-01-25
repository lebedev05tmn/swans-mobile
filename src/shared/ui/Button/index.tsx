import { TouchableOpacity, ViewStyle } from 'react-native';
import styles from './styles';

type TButton = {
    children: React.ReactNode;
    style?: ViewStyle;
    disabled?: boolean;
    onPress?: (() => void);
};

const Button = ({ children, style, onPress, disabled }: TButton) => {
    return (
        <TouchableOpacity
            onPress={onPress}
            disabled={disabled}
            activeOpacity={0.7}
            style={{ ...styles.button, ...style }}
        >
            {children}
        </TouchableOpacity>
    );
};

export default Button;
