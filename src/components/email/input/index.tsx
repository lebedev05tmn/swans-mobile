import React, { forwardRef, useState } from 'react';
import { TextInput, TextInputProps, View, TouchableOpacity } from 'react-native';
import Input from '@/src/shared/ui/Input';
import EyeIcon from '@/src/assets/svg/eye.svg';
import EyeCloseIcon from '@/src/assets/svg/eyeclose.svg';
import styles from './style';

type TAuthInput = {
  type?: 'text' | 'code' | 'password';
  editable?: boolean;
  showEye?: boolean;
  isSecure?: boolean;
  onToggleSecure?: () => void;
} & TextInputProps;

const AuthInput = forwardRef<TextInput, TAuthInput>(
  (
    {
      type = 'text',
      editable = true,
      showEye = false,
      isSecure = false,
      onToggleSecure,
      value = '',
      onChangeText,
      ...props
    },
    ref,
  ) => {
    const [isFocused, setIsFocused] = useState(false);

    const handleCodeChange = (text: string) => {
      if (type !== 'code') {
        onChangeText?.(text);
        return;
      }

      const cleaned = text.replace(/[^0-9]/g, '').slice(0, 5);
      if (cleaned.length > 3) {
        onChangeText?.(`${cleaned.slice(0, 3)}-${cleaned.slice(3)}`);
      } else {
        onChangeText?.(cleaned);
      }
    };

    const handleToggleSecure = () => {
      onToggleSecure?.();
    };
const isInactiveWithValue = !editable && !!value;

    const showFocusedStyle = isFocused || !!value;

    return (
      <View style={styles.container}>
        <Input
          {...props}
          ref={ref}
          value={value}
          onChangeText={handleCodeChange}
          editable={editable}
          secureTextEntry={type === 'password' && isSecure}
          keyboardType={type === 'code' ? 'numeric' : props.keyboardType}
          maxLength={type === 'code' ? 6 : props.maxLength}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          style={editable || isInactiveWithValue ? styles.textInput : styles.textInputDisabled}

          viewStyle={
  showFocusedStyle
    ? styles.inputViewFocused
    : editable
    ? styles.inputView
    : styles.inputViewDisabled
}

        />
        {showEye && (
          <TouchableOpacity style={styles.eyeIcon} onPress={handleToggleSecure}>
            {isSecure ? <EyeCloseIcon /> : <EyeIcon />}
          </TouchableOpacity>
        )}
      </View>
    );
  },
);

export default AuthInput;
