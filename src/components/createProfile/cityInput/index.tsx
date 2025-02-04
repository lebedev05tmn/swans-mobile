import Input from "@/src/shared/ui/Input";
import createProfileStore from '@/src/shared/stores/createProfile/store';

const CityInput = () => {
    const city = createProfileStore((state) => state.form.city);
    const setCity = createProfileStore((state) => state.actions.setCity);

    return (
        <Input
            onChange={(e) => setCity(e.target.value)}
            value={city}
            placeholder="Город..."
            placeholderTextColor="#A3A3A3"
            inputMode="text"
        />
    );
};


export default CityInput;