import { StyleSheet, TextInput } from "react-native";


const AboutTextInput = () => {
    return (
        <TextInput
            style={styles.aboutTextInput}
            placeholder="Напиши текст до 120 символов..."
            placeholderTextColor="#A3A3A3"
            multiline={true}
            maxLength={120}
            inputMode="text"
        />
    )
};

const styles = StyleSheet.create({
    aboutTextInput: {
        backgroundColor: '#EDEDED',
        borderRadius: 8,
        borderColor: '#D3D3D3',
        borderWidth: 1,
        fontSize: 16,
        lineHeight: 22,
        padding: 12,
        maxWidth: '100%',
        height: 96
    }
});

export default AboutTextInput;