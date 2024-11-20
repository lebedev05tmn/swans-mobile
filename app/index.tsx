import React from 'react';
import { StyleSheet, View, Text, Image, Dimensions } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import {
    useFonts,
    MontserratAlternates_700Bold,
} from '@expo-google-fonts/montserrat-alternates';

//30 строчка рендер шрифта, вместо текста склетон лоудер из глюстака

export default function HomeScreen() {
    const [loaded] = useFonts({
        MontserratAlternates_700Bold,
    });
    if (!loaded) {
        return null;
    }
    return (
        <LinearGradient
            colors={['#B18FCF', '#87CEEB']}
            style={styles.gradient}
            start={{ x: 0.1, y: 0.1 }}
            end={{ x: 0.9, y: 0.7 }}
        >
            <View style={styles.content}>
                <Image
                    style={styles.image}
                    source={require('../assets/logo.png')}
                />
                <Text style={styles.title}>SWANS</Text>
                <Text style={styles.textStyle}>
                    Приложение для поиска соулмейта
                </Text>
            </View>
        </LinearGradient>
    );
}

const styles = StyleSheet.create({
    image: {
        width: 260,
        height: 180,
        resizeMode: 'contain',
        // width:260,
        //height:180,
    },
    gradient: {
        flex: 1,
    },
    textStyle: {
        fontFamily: 'MontserratAlternates_700Bold',
        fontSize: 28,
        fontWeight: 700,
        lineHeight: 34.13,
        textAlign: 'center',
        color: '#FFFFFF',
        width: '78%',
        marginTop: 58,
    },
    content: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    title: {
        fontFamily: 'MontserratAlternates_700Bold',
        fontSize: 48,
        fontWeight: '700',
        lineHeight: 58.51,
        textAlign: 'center',
        color: '#FF4C00',
    },
});
