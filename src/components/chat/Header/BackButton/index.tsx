import Button from '@/src/shared/ui/Button';
import { ArrowLeft } from 'lucide-react-native';
import { FC } from 'react';
import styles from './style';

const BackButton: FC = () => {
    return (
        <Button style={styles.backButton}>
            <ArrowLeft color={'#414040'} size={24} />
        </Button>
    );
};

export default BackButton;
