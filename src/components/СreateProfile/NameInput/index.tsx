import Input from '@shared/ui/Input';
import useCreateProfileStore from '@stores/useCreateProfileStore';
import { FC } from 'react';

const NameInput: FC = () => {
    const userName = useCreateProfileStore((state) => state.form.user_name);
    const setUserName = useCreateProfileStore(
        (state) => state.actions.setUserName,
    );

    return (
        <Input
            onChangeText={setUserName}
            value={userName}
            placeholder="Имя"
            placeholderTextColor="#A3A3A3"
        />
    );
};

export default NameInput;
