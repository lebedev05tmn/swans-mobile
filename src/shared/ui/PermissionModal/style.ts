import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
        backgroundColor: '#f8f9fa',
    },
    title: {
        fontSize: 22,
        fontWeight: 'bold',
        marginBottom: 16,
        color: '#2c3e50',
    },
    message: {
        fontSize: 16,
        textAlign: 'center',
        marginBottom: 32,
        color: '#7f8c8d',
        lineHeight: 24,
    },
    button: {
        backgroundColor: '#3498db',
        paddingVertical: 14,
        paddingHorizontal: 32,
        borderRadius: 8,
        elevation: 3,
    },
    buttonText: {
        color: 'white',
        fontSize: 16,
        fontWeight: '600',
    },
    hint: {
        marginTop: 24,
        fontSize: 14,
        color: '#95a5a6',
        fontStyle: 'italic',
    },
});

export default styles;