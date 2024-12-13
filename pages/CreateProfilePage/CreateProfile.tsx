import { StyleSheet, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { LinearGradient } from 'expo-linear-gradient';

const CreateProfilePage = () => {
    

    return (
        <LinearGradient
                    colors={['#B18FCF', '#87CEEB']}
                    style={styles.gradient}
                    start={{ x: 0.1, y: 0.1 }}
                    end={{ x: 0.9, y: 0.7 }}
        >
            <SafeAreaView style={styles.container}>
                    
                    
            </SafeAreaView>
        </LinearGradient>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    gradient: {
        flex: 1,
    },
});

export default CreateProfilePage;