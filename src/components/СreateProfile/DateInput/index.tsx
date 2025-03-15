import React, { FC, useCallback, useMemo } from 'react';
import { Keyboard, Text, TextInput, View } from 'react-native';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import Input from '@shared/ui/Input';
import useCreateProfileStore from '@stores/useCreateProfileStore';
import styles from './style';

type TProps = {
    text: string;
    value: string;
    placeholderText: string;
    length: number;
    inputRef?: React.RefObject<TextInput>;
    onSubmitEditing?: () => void;
    onFocus?: () => void;
    onChangeText?: (text: string) => void;
};

const DateInputCell: FC<TProps> = React.memo(
    ({
        text,
        value,
        placeholderText,
        length,
        inputRef,
        onSubmitEditing,
        onFocus,
        onChangeText,
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
                    onChangeText={onChangeText}
                />
            </View>
        );
    },
);

const DateInput = () => {
    const { hideDatePicker, setBirthDate, showDatePicker, setErrorMessage } =
        useCreateProfileStore((state) => state.actions);
    const isDatePickerVisible = useCreateProfileStore(
        (state) => state.isDatePickerVisible,
    );
    const birthDate = useCreateProfileStore((state) => state.form.birth_date);

    const [year, month, day] = birthDate ? birthDate.split('-') : ['', '', ''];

    const handleConfirm = useCallback(
        (date: Date) => {
            const formattedDate = date.toISOString().split('T')[0];
            setBirthDate(formattedDate);
            hideDatePicker();
        },
        [setBirthDate, hideDatePicker],
    );

    const handleCancel = useCallback(() => {
        hideDatePicker();
    }, [hideDatePicker]);

    const handleFocus = useCallback(() => {
        Keyboard.dismiss();
        showDatePicker();
        setErrorMessage('');
    }, [showDatePicker, setErrorMessage]);

    const dayCellProps = useMemo(
        () => ({
            text: 'День',
            value: day,
            placeholderText: '01',
            length: 2,
            onFocus: handleFocus,
        }),
        [day, handleFocus],
    );

    const monthCellProps = useMemo(
        () => ({
            text: 'Месяц',
            value: month,
            placeholderText: '12',
            length: 2,
            onFocus: handleFocus,
        }),
        [month, handleFocus],
    );

    const yearCellProps = useMemo(
        () => ({
            text: 'Год',
            value: year,
            placeholderText: '1999',
            length: 4,
            onFocus: handleFocus,
        }),
        [year, handleFocus],
    );

    const dateTimePickerProps = useMemo(
        () => ({
            isVisible: isDatePickerVisible,
            onConfirm: handleConfirm,
            onCancel: handleCancel,
        }),
        [isDatePickerVisible, handleConfirm, handleCancel],
    );

    return (
        <View style={styles.dateWrap}>
            <DateInputCell {...dayCellProps} />
            <DateInputCell {...monthCellProps} />
            <DateInputCell {...yearCellProps} />
            <DateTimePickerModal {...dateTimePickerProps} />
        </View>
    );
};

export default React.memo(DateInput);
