import { StyleSheet, TextInput } from "react-native";

const NameInput = () => {
    return (
        <TextInput
            style={styles.nameInput}
            placeholder="Имя"
            placeholderTextColor="#A3A3A3"
            inputMode="text"
        />
    );
};

const styles = StyleSheet.create({
    nameInput: {
        backgroundColor: '#EDEDED',
        borderRadius: 8,
        borderColor: '#D3D3D3',
        borderWidth: 1,
        fontSize: 16,
        lineHeight: 22,
        paddingHorizontal: 12,
        paddingVertical: 8,
        height: 40,
    }
});

export default NameInput;