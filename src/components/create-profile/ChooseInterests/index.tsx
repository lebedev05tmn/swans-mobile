import { Heart, MapPin } from 'lucide-react-native';
import InterestCard from './InterestsCard';
import { View, Text } from 'react-native';
import styles from './style';
import SubmitButton from './SubmitButton';

const interestsData = [
    { label: 'Взаимопонимание', icon: Heart },
    { label: 'Близкая локация', icon: MapPin },
];

const ChooseInterests = () => {
    return (
        <View style={styles.container}>
            <Text style={styles.title}>Выбери свои интересы</Text>
            <InterestCard
                title="Основное в отношениях"
                interests={interestsData}
            />
            <SubmitButton />
        </View>
    );
};

export default ChooseInterests;
