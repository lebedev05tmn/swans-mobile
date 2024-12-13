import CountinueButton from "@/components/ui/CountinueButton/CountinueButton";
import { StyleSheet, View, Text } from "react-native";

type Props = {
    title: string,
    description: string,
    InputComponent: JSX.Element,
}

const CreateProfileContent: React.FC<Props> = ({ title, description, InputComponent }) => {
    return (
        <View style={styles.createProfileContent}>
            <Text style={styles.contentTitle}>{title}</Text>
            <Text style={styles.contentDescription}>{description}</Text>
            {InputComponent}
            <CountinueButton />
        </View>
    );
};

const styles = StyleSheet.create({
    createProfileContent: {
        paddingHorizontal: '7%',
    },
    contentTitle: {
        fontFamily: 'MontserratAlternates_700Bold',
        fontWeight: 700,
        fontSize: 28,
        color: '#FFFFFF',
        marginBottom: 14,
        lineHeight: 34,
    },
    contentDescription: {
        fontFamily: 'MontserratAlternates_400Regular',
        fontWeight: 400,
        fontSize: 18,
        color: '#FFFFFF',
        marginBottom: 20,
        lineHeight: 22,
    },
});

export default CreateProfileContent;