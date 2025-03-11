import { View, Pressable } from 'react-native';
import styles from './style';
import { Camera } from 'lucide-react-native';
import { launchImageLibrary } from 'react-native-image-picker';
import useCreateProfileStore from '@stores/useCreateProfileStore';
import ImageSlider from '@shared/ui/ImageSlider';
import ManagmentButtons from './ManagmentButtons';
import { FC } from 'react';

const ImagesInput: FC = () => {
    const { setImage, setErrorMessage } = useCreateProfileStore(
        (state) => state.actions,
    );
    const images = useCreateProfileStore((state) => state.form.images);

    const pickImage = async () => {
        setErrorMessage('');

        let result = await launchImageLibrary({
            mediaType: 'photo',
            quality: 1,

        })

        if (!result.didCancel && Array.isArray(result.assets) && result.assets.length > 0) {
            setImage(result.assets[0].uri!);
        }
    };

    return !images?.length ? (
        <Pressable onPress={pickImage}>
            <View style={styles.container}>
                <Camera size={48} color={'#6D6D6D'} onPress={pickImage} />
            </View>
        </Pressable>
    ) : (
        <View style={styles.container}>
            <ImageSlider images={images} />
            <ManagmentButtons />
        </View>
    );
};

export default ImagesInput;
