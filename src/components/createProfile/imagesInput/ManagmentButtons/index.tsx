import Button from '@/src/shared/ui/Button';
import { Pencil, Plus, Trash2 } from 'lucide-react-native';
import { FC } from 'react';
import { View } from 'react-native';
import styles from './style';
import useCreateProfileStore from '@/src/shared/stores/createProfile/store';
import useImagesStore from '@/src/shared/stores/ImagesStore';

type TManagmentButtons = { pickImage: () => void };

const ManagmentButtons: FC<TManagmentButtons> = ({ pickImage }) => {
    const { deleteImage } = useCreateProfileStore((state) => state.actions);
    const { setCurrentImageIndex } = useImagesStore((state) => state.actions);
    const currentImageIndex = useImagesStore(
        (state) => state.currentImageIndex,
    );

    return (
        <View style={styles.managmentButtons}>
            <Button
                style={styles.managmentButton}
                onPress={() => {
                    deleteImage(currentImageIndex);
                    setCurrentImageIndex(currentImageIndex - 1);
                }}
            >
                <Trash2 color={'#FF4E51'} size={30} />
            </Button>

            <Button style={styles.managmentButton} onPress={pickImage}>
                <Plus color={'#0066FF'} size={34} />
            </Button>

            <Button style={styles.managmentButton}>
                <Pencil color={'#FFB303'} size={25} />
            </Button>
        </View>
    );
};

export default ManagmentButtons;
