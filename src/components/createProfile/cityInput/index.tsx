import Input from "@/src/shared/ui/Input";
import createProfileStore from '@/src/shared/stores/createProfile/store';

const CityInput = () => {
    const city = createProfileStore((state) => state.form.city);
    const setCity = createProfileStore((state) => state.actions.setCity);
    const setErrorMessage = createProfileStore(
        (state) => state.actions.setErrorMessage,
    );

    return (
        <Input
            onChangeText={(text) => {
                setCity(text);
                setErrorMessage('');
            }}
            value={city}
            placeholder="Город..."
            placeholderTextColor="#A3A3A3"
            inputMode="text"
        />
    );
};


export default CityInput;