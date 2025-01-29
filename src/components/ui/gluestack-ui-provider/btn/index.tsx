import React from 'react';
import {
    Pressable,
    Text,
    StyleSheet,
    ViewStyle,
    TextStyle,
} from 'react-native';

interface ButtonProps {
    children: React.ReactNode;
    onPress: () => void;
    disabled?: boolean;
    customStyles?: {
        button?: ViewStyle;
        text?: TextStyle;
    };
}

const Button: React.FC<ButtonProps> = ({
    children,
    onPress,
    disabled,
    customStyles,
}) => {
    return (
        <Pressable
            onPress={onPress}
            disabled={disabled}
            style={({ pressed }) => [
                styles.button,
                customStyles?.button,
                disabled ? styles.disabled : pressed && styles.pressed,
            ]}
        >
            <Text style={[styles.text, customStyles?.text]}>{children}</Text>
        </Pressable>
    );
};

const styles = StyleSheet.create({
    button: {
        width: '90%',
        height: 50,
        borderRadius: 16,
        backgroundColor: '#2B80FF',
        justifyContent: 'center',
        alignItems: 'center',
        marginVertical: 12,
    },
    text: {
        fontSize: 16,
        color: '#FFFFFF',
        fontWeight: 'bold',
    },
    pressed: {
        backgroundColor: '#1A5FBF',
    },
    disabled: {
        backgroundColor: '#A9A9A9',
    },
});

export default Button;
