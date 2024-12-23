import { StyleSheet, Text } from 'react-native';
import createProfileStore from '@/src/pages/CreateProfilePage/store';
import { ArrowRight } from 'lucide-react-native';
import Button from '@/src/shared/ui/Button';

const NextButton = () => {
    const next = createProfileStore((state) => state.action.next);
    const isNextButtonDisabled = createProfileStore(
        (state) => state.isNextButtonDisabled,
    );

    return (
        <Button 
            customStyles={styles.nextButton} 
            onPress={next} 
            disabled={isNextButtonDisabled}
        >
            <Text style={styles.text}>Продолжить</Text>
            <ArrowRight color={'#404040'} size={18} />
        </Button>
        
    );
};

const styles = StyleSheet.create({
    nextButton: {
        gap: 8,
        marginTop: 28,
    },
    text: {
        color: '#404040',
        fontWeight: 500,
        fontSize: 16,
        lineHeight: 19,
    },
});

export default NextButton;
