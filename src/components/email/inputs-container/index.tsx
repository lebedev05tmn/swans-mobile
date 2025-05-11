import React from 'react';
import { View, Text, KeyboardTypeOptions } from 'react-native';
import data from '@/datac.json';
import { useEmailAuthStore, TEmailAuthStore } from '@/src/shared/stores/useEmailAuthStore';
import AuthInput from '@/src/components/email/input';
import styles from './style';

interface Field {
  name: string;
  label?: string;
  placeholder: string;
  inputMode?: string;
  valueKey: string;
  editable: boolean;
  secureTextEntry?: boolean;
  maxLength?: number;
  validationRules?: string[];
}

const InputsContainer: React.FC = () => {
  const currentIndex = useEmailAuthStore((state: TEmailAuthStore) => state.currentIndex);
  const form = useEmailAuthStore((state: TEmailAuthStore) => state.form);
  const passwordVisibility = useEmailAuthStore((state: TEmailAuthStore) => state.passwordVisibility);
  const { setFormField, togglePasswordVisibility } = useEmailAuthStore(
    (state: TEmailAuthStore) => state.actions,
  );

  const fields = data[currentIndex]?.fields || [];

  if (!fields.length) {
    console.error('InputsContainer: No fields to render for currentIndex=', currentIndex, 'data=', data[currentIndex]);
    return null;
  }

  console.log('InputsContainer: rendering, currentIndex=', currentIndex, 'fields=', fields);

  return (
    <View style={styles.container}>
      {fields.map((field: Field, index: number) => {
        const isEmail = field.name === 'email';
        const isPassword = field.name === 'password' || field.name === 'confirmPassword';
        const isCode = field.name === 'code';

        const fieldName = field.name as 'password' | 'confirmPassword';
        const labelText =
          isEmail ? 'Почта' :
          currentIndex === 2 && index === 1 ? 'Создание пароля' :
          isPassword && currentIndex === 5 ? 'Введите пароль' : 
          field.label || '';

        console.log('InputsContainer: rendering field=', field.name, 'labelText=', labelText);

        return (
          <View key={field.name} style={styles.inputWrapper}>
            {labelText && (
              <Text style={styles.label}>{labelText}</Text>
            )}
            <AuthInput
              type={isPassword ? 'password' : isCode ? 'code' : 'text'}
              placeholder={field.placeholder}
              value={form[field.valueKey as keyof typeof form]}
              onChangeText={(text: string) =>
                setFormField(field.valueKey as keyof typeof form, text)
              }
              editable={field.editable}
              showEye={isPassword}
              isSecure={isPassword ? passwordVisibility[fieldName] : false}
              onToggleSecure={() => {
                console.log('InputsContainer: toggling visibility for field=', field.name);
                togglePasswordVisibility(fieldName);
              }}
              keyboardType={field.inputMode as KeyboardTypeOptions}
              secureTextEntry={field.secureTextEntry}
              maxLength={field.maxLength}
              
            />
          </View>
        );
      })}
    </View>
  );
};

export default InputsContainer;