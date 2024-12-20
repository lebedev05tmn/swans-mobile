import { TextInput } from "react-native";
import { StyleSheet, Text, View } from "react-native";

type Props = {
    text: string,
    placeholderText: string,
    lenght: number
}

const DateInputCell: React.FC<Props> = ({text, placeholderText, lenght}) => {
    return (
        <View style={styles.dateCell}>
            <Text style={styles.dateCellText}>{text}</Text>
            <TextInput 
                style={styles.dateCellInput}
                placeholder={placeholderText}
                placeholderTextColor="#A3A3A3"
                inputMode="numeric"
                textAlignVertical="center"
                textAlign="center"
                maxLength={lenght}
            />
        </View>
    );
};

const DateInput = () => {
    return (
        <View style={styles.dateWrap}>
            <DateInputCell
                text="День"
                placeholderText="01"
                lenght={2}
            />
            <DateInputCell
                text="Месяц"
                placeholderText="12"
                lenght={2}
            />
            <DateInputCell
                text="Год"
                placeholderText="1999"
                lenght={4}
            />
        </View>
    )
};

const styles = StyleSheet.create({
    dateWrap: {
        flexDirection: 'row',
        gap: 10,
        width: `100%`
    },
    dateCellInput: {
        backgroundColor: '#EDEDED',
        borderRadius: 8,
        borderColor: '#D3D3D3',
        borderWidth: 1,
        fontSize: 16,
        lineHeight: 22,
        paddingHorizontal: 12,
        paddingVertical: 8,
        height: 40,
        width: '100%',
        textAlign: 'center',
    },
    dateCellText: {
        fontFamily: 'MontserratAlternates_600SemiBold',
        color: '#fff',
        fontWeight: 600,
    },
    dateCell: {
        alignItems: 'center',
        gap: 3,
        flex: 1,
        position: 'relative',
    }
});

export default DateInput;