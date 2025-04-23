import useCreateProfileStore from '@/src/shared/stores/useCreateProfileStore';
import ImageSlider from '@/src/shared/ui/ImageSlider';
import * as ImagePicker from 'expo-image-picker';
import { Camera } from 'lucide-react-native';
import { Pressable, View } from 'react-native';
import ManagmentButtons from './ManagmentButtons';
import styles from './style';

const ImagesInput = () => {
    const { setImage, setErrorMessage } = useCreateProfileStore(
        (state) => state.actions,
    );
    const images = useCreateProfileStore((state) => state.form.images);

    const pickImage = async () => {
        setErrorMessage('');

        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ['images'],
            allowsEditing: true,
            aspect: [340, 510],
            quality: 1,
        });

        if (!result.canceled) {
            setImage(result.assets[0].uri);
        }
    };

    return images.length === 0 ? (
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
