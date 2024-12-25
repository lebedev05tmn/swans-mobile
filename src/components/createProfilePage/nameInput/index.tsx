import { StyleSheet } from "react-native";
import Input from "@/src/shared/ui/TextInput";

const NameInput = () => {
    return (
        <Input
            customStyles={styles.nameInput}
            placeholder="Имя"
            placeholderTextColor="#A3A3A3"
        />
    );
};

const styles = StyleSheet.create({
    nameInput: {
        height: 40,
    }
});

export default NameInput;