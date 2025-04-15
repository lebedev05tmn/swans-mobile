import { ArrowLeft } from 'lucide-react-native';
import useCreateProfileStore from '@/src/shared/stores/useCreateProfileStore';
import styles from './style';
import Button from '@/src/shared/ui/Button';
import { FC } from 'react';

type TBackButton = {
    onPress: () => void;
};

const BackButton: FC<TBackButton> = ({ onPress }) => {
    const isBackButtonDisabled = useCreateProfileStore(
        (state) => state.isPreviousButtonDisabled,
    );

    return (
        <Button
            disabled={isBackButtonDisabled}
            onPress={onPress}
            style={styles.prevButton}
        >
            <ArrowLeft
                color={'#CECECE'}
                opacity={isBackButtonDisabled ? 0.75 : 1}
                size={24}
            />
        </Button>
    );
};

export default BackButton;
