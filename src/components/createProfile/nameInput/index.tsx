import Input from "@/src/shared/ui/Input";
import createProfileStore from "@/src/shared/stores/createProfile/store";

const NameInput = () => {
    const userName = createProfileStore((state) => state.form.user_name);
    const setUserName = createProfileStore((state) => state.actions.setUserName);

    return (
        <Input
            onChangeText={(text) => setUserName(text)}
            value={userName}
            placeholder="Имя"
            placeholderTextColor="#A3A3A3"
        />
    );
};

export default NameInput;