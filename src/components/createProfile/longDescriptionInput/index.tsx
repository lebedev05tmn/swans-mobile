import Input from "@/src/shared/ui/Input";
import { StyleSheet } from "react-native";
import createProfileStore from "@/src/shared/stores/createProfile/store";


const LongDescriptionInput = () => {
    const longDescription = createProfileStore((state) => state.form.long_desc);
    const setLongDescription = createProfileStore((state) => state.actions.setLongDesc);

    return (
        <Input
            style={styles.aboutTextInput}
            placeholder="Напиши текст до 120 символов..."
            onChange={(e) => setLongDescription(e.target.value)}
            value={longDescription}
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

export default LongDescriptionInput;