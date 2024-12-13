import { View, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { LinearGradient } from 'expo-linear-gradient';


const CreateProfilePage = () => {
    return (
        <SafeAreaView>
            <LinearGradient
                        colors={['#B18FCF', '#87CEEB']}
                        style={styles.gradient}
                        start={{ x: 0.1, y: 0.1 }}
                        end={{ x: 0.9, y: 0.7 }}
            >
                
            </LinearGradient>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    gradient: {
        flex: 1,
    },
});

export default CreateProfilePage;