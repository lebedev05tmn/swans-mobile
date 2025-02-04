import { View } from 'react-native';
import styles from './style';
import { Camera } from 'lucide-react-native';

const ImageSlider = () => {
    

    return (
        <View style={styles.container}>
            <Camera size={48} color={'#6D6D6D'} />
        </View>
    );
};

export default ImageSlider;

