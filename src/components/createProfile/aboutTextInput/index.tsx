import Input from "@/src/shared/ui/Input";
import { StyleSheet } from "react-native";


const AboutTextInput = () => {
    return (
        <Input
            style={styles.aboutTextInput}
            placeholder="Напиши текст до 120 символов..."
            placeholderTextColor="#A3A3A3"
            multiline={true}
            maxLength={120}
            textAlignVertical={"top"}
        />
    )
};

const styles = StyleSheet.create({
    aboutTextInput: {
        padding: 12,
        height: 96,
    }
});

export default AboutTextInput;