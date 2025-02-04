import React, { useRef, useState } from 'react';
import { StyleSheet, Text, View, TextInput, Keyboard } from 'react-native';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import createProfileStore from '@/src/shared/stores/createProfile/store';
import Input from '@/src/shared/ui/Input';

type Props = {
    text: string;
    value: string;
    placeholderText: string;
    length: number;
    inputRef?: React.RefObject<TextInput>;
    onSubmitEditing?: () => void;
    onFocus?: () => void;
};

const DateInputCell: React.FC<Props> = ({
    text,
    value,
    placeholderText,
    length,
    inputRef,
    onSubmitEditing,
    onFocus,
}) => {
    return (
        <View style={styles.dateCell}>
            <Text style={styles.dateCellText}>{text}</Text>
            <Input
                ref={inputRef}
                style={styles.dateCellInput}
                placeholder={placeholderText}
                inputMode="numeric"
                textAlign="center"
                maxLength={length}
                value={value}
                onSubmitEditing={onSubmitEditing}
                onFocus={onFocus}
            />
        </View>
    );
};

const DateInput = () => {
    const { hideDatePicker, setBirthDate, showDatePicker } = createProfileStore(
        (state) => state.actions,
    );
    const isDatePickerVisible = createProfileStore(
        (state) => state.isDatePickerVisible,
    );
    const birthDate = createProfileStore((state) => state.form.birth_date);

    const [isFirstFocus, setIsFirstFocus] = useState(true);
    const [year, month, day] = birthDate ? birthDate.split('-') : ['', '', ''];

    const dayInputRef = useRef<TextInput>(null);
    const monthInputRef = useRef<TextInput>(null);
    const yearInputRef = useRef<TextInput>(null);

    const handleConfirm = (date: Date) => {
        const formattedDate = date.toISOString().split('T')[0];
        setBirthDate(formattedDate);
        hideDatePicker();
    };

    const handleCancel = () => {
        hideDatePicker();
    };

    return (
        <View style={styles.dateWrap}>
            <DateInputCell
                text="День"
                value={day}
                placeholderText="01"
                length={2}
                inputRef={dayInputRef}
                onFocus={() => {
                    if (isFirstFocus) {
                        Keyboard.dismiss();
                        showDatePicker();
                        setIsFirstFocus(false);
                    } else {
                        dayInputRef.current?.focus();
                    }
                }}
                onSubmitEditing={() => monthInputRef.current?.focus()}
            />
            <DateInputCell
                text="Месяц"
                value={month}
                placeholderText="12"
                length={2}
                inputRef={monthInputRef}
                onFocus={() => {
                    if (isFirstFocus) {
                        Keyboard.dismiss();
                        showDatePicker();
                        setIsFirstFocus(false);
                    } else {
                        monthInputRef.current?.focus();
                    }
                }}
                onSubmitEditing={() => yearInputRef.current?.focus()}
            />
            <DateInputCell
                text="Год"
                value={year}
                placeholderText="1999"
                length={4}
                inputRef={yearInputRef}
                onFocus={() => {
                    if (isFirstFocus) {
                        Keyboard.dismiss();
                        showDatePicker();
                        setIsFirstFocus(false);
                    } else {
                        yearInputRef.current?.focus();
                    }
                }}
            />

            <DateTimePickerModal
                isVisible={isDatePickerVisible}
                mode="date"
                onConfirm={handleConfirm}
                onCancel={handleCancel}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    dateWrap: {
        flexDirection: 'row',
        width: '100%',
        gap: 10,
    },
    dateCell: {
        flex: 1,
        gap: 3,
    },
    dateCellInput: {
        alignItems: 'center',
        justifyContent: 'center',
    },
    dateCellText: {
        fontFamily: 'MontserratAlternates_600SemiBold',
        color: '#fff',
        fontWeight: '600',
        fontSize: 14,
        textAlign: 'center',
    },
});

export default DateInput;
