import { StyleSheet, TextInput, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { LinearGradient } from 'expo-linear-gradient';
import ArrowLeftIcon from "@/assets/svg/ArrowLeftIcon";
import ProgressWave from "@/assets/svg/ProgressWave";
import CreateProfileContent from "@/components/CreateProfileContent/CreateProfileContent";


const CreateProfilePage = () => {
    return (
        <LinearGradient
                    colors={['#B18FCF', '#87CEEB']}
                    style={styles.gradient}
                    start={{ x: 0.1, y: 0.1 }}
                    end={{ x: 0.9, y: 0.7 }}
        >
            <SafeAreaView style={styles.container}>
                    <View style={styles.header}>
                        <ArrowLeftIcon style={styles.arrowLeftIcon} />
                        <ProgressWave />
                    </View>
                    <CreateProfileContent
                        title={"Привет, давай знакомиться"}
                        description={"Будь собой при выборе имени, привлекает больше внимания."}
                        InputComponent={
                            <TextInput
                                style={styles.input}
                                placeholder="Имя"
                                placeholderTextColor="#A3A3A3"
                            />
                        }
                    />
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
    header: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        height: 30,
        marginHorizontal: '7%',
        marginVertical: 28,
    },
    arrowLeftIcon: {
        position: 'absolute',
        left: 0,
    },
    input: {
        backgroundColor: '#EDEDED',
        marginBottom: 28,
        borderRadius: 8,
        borderColor: '#D3D3D3',
        borderWidth: 1,
        fontSize: 16,
        lineHeight: 24,
        paddingHorizontal: 12,
        paddingVertical: 8,
        
    },
    continueButton: {
        backgroundColor: '#EDEDED',
    },
});

export default CreateProfilePage;