import Button from '@/src/shared/ui/Button';
import { ArrowLeft } from 'lucide-react-native';
import { FC } from 'react';
import styles from './style';
import { router } from 'expo-router';

const BackButton: FC = () => {
    const handlePress = () => {
        router.back();
    };

    return (
        <Button style={styles.backButton} onPress={handlePress}>
            <ArrowLeft color={'#414040'} size={24} />
        </Button>
    );
};

export default BackButton;
