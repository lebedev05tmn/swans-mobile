import Button from '@/src/shared/ui/Button';
import styles from './styles';
import { ArrowRight } from 'lucide-react-native';
import { Alert, Text } from 'react-native';
import { useCreateProfile, useProfiles, useUpdateProfile } from '@/src/shared/hooks/useProfile';
import createProfileStore from '@/src/shared/stores/createProfile/store';

const SubmitButton = () => {
    const {
        data: profiles,
        refetch,
    } = useProfiles();

    const handlePress = async () => {
        try {
            const result = await refetch();
            Alert.alert('Ответ от сервера:', JSON.stringify(result.data));
            console.log('Ответ от сервера:', JSON.stringify(result.data));
        } catch (err: any) {
            Alert.alert('Ошибка при запросе:', err.message);
            console.log('Ошибка при запросе:', err.message);
        }
    };


    return (
        <Button style={styles.submitButton} onPress={handlePress}>
            <Text style={styles.text}>Продолжить</Text>
            <ArrowRight color={'#404040'} size={18} />
        </Button>
    );
};

export default SubmitButton;
