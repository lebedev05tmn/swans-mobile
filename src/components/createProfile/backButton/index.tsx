import { ArrowLeft } from 'lucide-react-native';
import createProfileStore from '@/src/shared/stores/createProfile/store';
import styles from './styles';
import Button from '@/src/shared/ui/Button';

type TBackButton = {
    onPress: any;
};

const BackButton = ({ onPress }: TBackButton) => {
    const isPreviousButtonDisabled = createProfileStore(
        (state) => state.isPreviousButtonDisabled,
    );

    return (
        <Button
            disabled={isPreviousButtonDisabled}
            onPress={onPress}
            style={styles.prevButton}
        >
            {isPreviousButtonDisabled ? (
                <ArrowLeft color={'#CECECE'} opacity={0.75} size={24} />
            ) : (
                <ArrowLeft color={'#CECECE'} size={24} />
            )}
        </Button>
    );
};

export default BackButton;
