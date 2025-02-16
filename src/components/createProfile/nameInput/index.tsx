import Input from '@/src/shared/ui/Input';
import createProfileStore from '@/src/shared/stores/useCreateProfileStore';

const NameInput = () => {
    const userName = createProfileStore((state) => state.form.user_name);
    const setUserName = createProfileStore(
        (state) => state.actions.setUserName,
    );
    const setErrorMessage = createProfileStore(
        (state) => state.actions.setErrorMessage,
    );

    return (
        <Input
            onChangeText={(text) => {
                setUserName(text);
                setErrorMessage('');
            }}
            value={userName}
            placeholder="Имя"
            placeholderTextColor="#A3A3A3"
        />
    );
};

export default NameInput;
