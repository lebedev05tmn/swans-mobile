import Input from '@shared/ui/Input';
import useCreateProfileStore from '@stores/useCreateProfileStore';
import { FC } from 'react';

const CityInput: FC = () => {
    const city = useCreateProfileStore((state) => state.form.city);
    const setCity = useCreateProfileStore((state) => state.actions.setCity);

    return (
        <Input
            onChangeText={setCity}
            value={city}
            placeholder="Город..."
            placeholderTextColor="#A3A3A3"
            inputMode="text"
        />
    );
};

export default CityInput;
