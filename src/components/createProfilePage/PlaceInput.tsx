import React from "react";
import { StyleSheet, TextInput } from "react-native";

const PlaceInput = () => {
    return (
        <TextInput
            style={styles.placeInput}
            placeholder="Город..."
            placeholderTextColor="#A3A3A3"
            inputMode="text"
        />
    );
};

const styles = StyleSheet.create({
    placeInput: {
        backgroundColor: '#EDEDED',
        borderRadius: 8,
        borderColor: '#D3D3D3',
        borderWidth: 1,
        fontSize: 16,
        lineHeight: 22,
        paddingHorizontal: 12,
        paddingVertical: 8,
        height: 40,

    }
});

export default PlaceInput;