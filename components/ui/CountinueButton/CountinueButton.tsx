import { Pressable, StyleSheet, Text, View } from "react-native";
import ArrowRightIcon from "@/assets/svg/ArrowRightIcon";

const CountinueButton = () => {
    return (
        <Pressable>
            <View style={styles.countinueButton}>
                <Text style={styles.text}>Продолжить</Text>
                <ArrowRightIcon />
            </View>
        </Pressable>
    )
};

const styles = StyleSheet.create({
    countinueButton: {
        height: 50,
        width: '100%',
        flexDirection: 'row',
        gap: 8,
        backgroundColor: '#EDEDED',
        borderRadius: 16,
        justifyContent: 'center',
        alignItems: 'center',
    },
    text: {
        color: '#404040',
        fontWeight: 500,
        fontSize: 16,
        lineHeight: 19,
    }
});

export default CountinueButton;