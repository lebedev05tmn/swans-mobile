import { FC, PropsWithChildren } from 'react';
import {
    TouchableOpacity,
    TouchableOpacityProps,
    StyleSheet,
} from 'react-native';
import styles from './style';

export type TButton = TouchableOpacityProps & PropsWithChildren;

const Button: FC<TButton> = ({ children, style, ...props }) => {
    const flattenedStyle = StyleSheet.flatten([styles.button, style]);

    return (
        <TouchableOpacity
            {...props}
            activeOpacity={0.75}
            style={flattenedStyle}
        >
            {children}
        </TouchableOpacity>
    );
};

export default Button;
