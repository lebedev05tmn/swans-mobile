import Button from '@/src/shared/ui/Button';
import styles from './styles';
import { ArrowRight } from 'lucide-react-native';
import { Text } from 'react-native';

const SubmitButton = () => {
    return (
        <Button style={styles.submitButton}>
            <Text style={styles.text}>Продолжить</Text>
            <ArrowRight color={'#404040'} size={18} />
        </Button>
    );
};

export default SubmitButton;
