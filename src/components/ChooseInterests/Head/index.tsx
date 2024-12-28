import { View, Text, StyleSheet } from 'react-native';
import { ArrowLeft } from 'lucide-react-native';
import Button from '@/src/shared/ui/Button';
import { useRouter } from 'expo-router';

const Head = () => {
    const router = useRouter();
    
    return (
        <View style={styles.head}>
            <Button style={styles.backButton} onPress={() => router.back()}>
                <ArrowLeft color={'#CECECE'} size={24} />
            </Button>
            <Text style={styles.title}>Выбери свои{'\n'} интересы</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    head: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent:'center'
    },
    title: {
        fontFamily: 'MontserratAlternates_700Bold',
        fontWeight: 700,
        fontSize: 28,
        lineHeight: 34,
        textAlign: 'center',
        color: '#FFFFFF',
        marginTop: 16,
        marginBottom: 30,
    },
    backButton: {
        height: 'auto',
        width: 'auto',
        position: 'absolute',
        left: 0,
        backgroundColor: 'transparent',
    },
});

export default Head;
