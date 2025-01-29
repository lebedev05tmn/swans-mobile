import Input from '@/src/shared/ui/Input';
import { StyleSheet, Text, View, Dimensions } from 'react-native';

type Props = {
    text: string;
    placeholderText: string;
    lenght: number;
};

const DateInputCell: React.FC<Props> = ({ text, placeholderText, lenght }) => {
    return (
        <View style={styles.dateCell}>
            <Text style={styles.dateCellText}>{text}</Text>
            <Input
                style={styles.dateCellInput}
                placeholder={placeholderText}
                placeholderTextColor="#A3A3A3"
                inputMode="numeric"
                textAlign="center"
                maxLength={lenght}
            />
        </View>
    );
};

const DateInput = () => {
    return (
        <View style={styles.dateWrap}>
            <DateInputCell text="День" placeholderText="01" lenght={2} />
            <DateInputCell text="Месяц" placeholderText="12" lenght={2} />
            <DateInputCell text="Год" placeholderText="1999" lenght={4} />
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
