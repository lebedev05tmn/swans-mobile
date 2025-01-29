import React, { useState, useEffect } from 'react';
import {
    StyleSheet,
    View,
    Text,
    Modal,
    ScrollView,
    TouchableWithoutFeedback,
    Animated,
    Dimensions,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import Button from '../../shared/ui/Button';
import LogoSVG from '../../assets/Loggo.svg';
import * as Linking from 'expo-linking';
import * as Crypto from 'expo-crypto';

import {
    useFonts,
    MontserratAlternates_400Regular,
    MontserratAlternates_700Bold,
} from '@expo-google-fonts/montserrat-alternates';
import { Roboto_500Medium, Roboto_700Bold } from '@expo-google-fonts/roboto';

const { width: screenWidth, height: screenHeight } = Dimensions.get('window');

const botToken = '7624610448:AAFQqXyjYdL_1DtLyvwUn3Rnx27eIZ8CgWw';

const Registration = () => {
    const [modalVisible, setModalVisible] = useState(false);
    const [fadeAnim] = useState(new Animated.Value(0));
    const [slideAnim] = useState(new Animated.Value(screenHeight));
    const [uniqueCode, setUniqueCode] = useState<string | null>(null);

    const [fontsLoaded] = useFonts({
        MontserratAlternates_400Regular,
        MontserratAlternates_700Bold,
        Roboto_500Medium,
        Roboto_700Bold,
    });

    const authMethods = [
        { label: 'Telegram', action: () => handleTelegramAuth() },
        { label: 'ВК', action: () => console.log('Авторизация через ВК') },
        {
            label: 'Apple',
            action: () => console.log('Авторизация через Apple'),
        },
        { label: 'Mail', action: () => console.log('Авторизация через Mail') },
    ];

    useEffect(() => {
        const handleDeepLink = async (event: { url: string }) => {
            const data = Linking.parse(event.url);
            if (data.queryParams) {
                await verifyTelegramAuth(
                    data.queryParams as Record<string, string>,
                );
            }
        };

        const unsubscribe = Linking.addEventListener('url', handleDeepLink);

        return () => {
            unsubscribe.remove();
        };
    }, []);

    const verifyTelegramAuth = async (queryParams: Record<string, string>) => {
        const secretKey = await Crypto.digestStringAsync(
            Crypto.CryptoDigestAlgorithm.SHA256,
            botToken,
        );

        const { hash, ...data } = queryParams;
        const sortedData = Object.keys(data)
            .sort()
            .map((key) => `${key}=${data[key]}`)
            .join('\n');

        const checkHash = await Crypto.digestStringAsync(
            Crypto.CryptoDigestAlgorithm.SHA256,
            sortedData + secretKey,
        );

        if (checkHash === hash) {
            console.log(' Успешная авторизация через Telegram:', data);
            setUniqueCode(data.id);
        } else {
            console.log('❌ Ошибка проверки подписи!');
        }
    };

    const showModal = () => {
        setModalVisible(true);
        Animated.timing(fadeAnim, {
            toValue: 1,
            duration: 100,
            useNativeDriver: true,
        }).start();
        Animated.timing(slideAnim, {
            toValue: 0,
            duration: 200,
            useNativeDriver: true,
        }).start();
    };

    const hideModal = () => {
        Animated.timing(fadeAnim, {
            toValue: 0,
            duration: 200,
            useNativeDriver: true,
        }).start(() => setModalVisible(false));
        Animated.timing(slideAnim, {
            toValue: screenHeight,
            duration: 400,
            useNativeDriver: true,
        }).start();
    };

    const handleTelegramAuth = () => {
        const redirectUri = 'https://qieozjs-anonymous-8081.exp.direct/auth';
        const authUrl = `https://oauth.telegram.org/auth?bot_id=${botToken}&origin=${encodeURIComponent(
            redirectUri,
        )}&request_access=write`;

        Linking.openURL(authUrl);
    };

    return (
        <LinearGradient
            colors={['#D1A1F2', '#87CEEB']}
            style={styles.gradient}
            start={{ x: 0.2, y: 0.2 }}
            end={{ x: 0.9, y: 0.8 }}
        >
            <View style={styles.container}>
                <View style={styles.topFlex}>
                    <Text style={styles.title}>SWANS</Text>
                    <View style={styles.logoContainer}>
                        <LogoSVG style={styles.logo} />
                    </View>
                    <Text style={styles.textStyle}>Найди своего соулмейта</Text>
                </View>

                <View style={styles.bottomFlex}>
                    <View style={styles.buttonBackground}>
                        <Button
                            onPress={showModal}
                            customStyles={styles.mainButton}
                        >
                            <Text style={styles.mainButtonText}>Войти</Text>
                        </Button>
                    </View>
                    <Text style={styles.terms}>
                        Нажимая «Войти», ты соглашаешься с{'\n'}
                        <Text style={styles.link}>Условиями</Text>.
                    </Text>
                </View>
            </View>

            <Modal transparent visible={modalVisible} animationType="none">
                <TouchableWithoutFeedback onPress={hideModal}>
                    <View style={styles.modalOverlay}>
                        <Animated.View
                            style={[styles.fadeOverlay, { opacity: fadeAnim }]}
                        />
                        <TouchableWithoutFeedback>
                            <Animated.View
                                style={[
                                    styles.modalContent,
                                    { transform: [{ translateY: slideAnim }] },
                                ]}
                            >
                                <View style={styles.modalTitleContainer}>
                                    <Text style={styles.modalTitle}>
                                        Выберите метод авторизации
                                    </Text>
                                </View>
                                <ScrollView
                                    contentContainerStyle={
                                        styles.scrollViewContent
                                    }
                                    showsVerticalScrollIndicator={false}
                                >
                                    {authMethods.map((method) => (
                                        <Button
                                            key={method.label}
                                            onPress={method.action}
                                            customStyles={styles.authButton}
                                        >
                                            <Text style={styles.authButtonText}>
                                                {method.label}
                                            </Text>
                                        </Button>
                                    ))}
                                </ScrollView>
                            </Animated.View>
                        </TouchableWithoutFeedback>
                    </View>
                </TouchableWithoutFeedback>
            </Modal>
        </LinearGradient>
    );
};
const styles = StyleSheet.create({
    gradient: {
        flex: 1,
    },
    container: {
        flex: 1,
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    topFlex: {
        alignItems: 'center',
    },
    title: {
        marginTop: '36%',
        fontFamily: 'MontserratAlternates_700Bold',
        fontSize: 48,
        textAlign: 'center',
        color: '#FF4C00',
        textShadowColor: 'rgba(111, 75, 232, 0.4)',
        textShadowOffset: { width: 0, height: 0 },
        textShadowRadius: 20,
    },
    logoContainer: {
        width: '80%',
        maxWidth: 231,
        aspectRatio: 231 / 155,
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 10,
    },
    logo: {
        width: '100%',
        height: '100%',
        resizeMode: 'contain',
    },
    textStyle: {
        fontFamily: 'MontserratAlternates_700Bold',
        fontSize: 20,
        textAlign: 'center',
        color: '#FFFFFF',
        marginBottom: '5%',
        textShadowColor: 'rgba(82, 68, 232, 0.3)',
        textShadowOffset: { width: 0, height: 4 },
        textShadowRadius: 4,
    },
    bottomFlex: {
        alignItems: 'center',
        marginBottom: '9.74%',
    },
    buttonBackground: {
        width: '80%',
        maxWidth: 300,
        height: 50,
        backgroundColor: '#2880FF',
        borderRadius: 16,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: screenHeight * 0.03,
    },
    mainButton: {
        width: '100%',
        height: '100%',
        backgroundColor: '#2B80FF',
        borderRadius: 16,
        justifyContent: 'center',

        textAlign: 'left', // Убираем
    },
    mainButtonText: {
        fontFamily: 'Roboto_700Bold',
        fontSize: 20,
        color: '#FFFFFF',
        textAlign: 'center',
        flex: 1, // Попробуй
        textAlignVertical: 'center', // Для Android
    },

    terms: {
        marginBottom: '10%',
        fontFamily: 'MontserratAlternates_700Bold',
        fontSize: 15,
        lineHeight: 18.29,
        color: '#FFFFFF',
        textAlign: 'center',
        maxWidth: 300,
        textShadowColor: '#00000040',
        textShadowOffset: { width: 0, height: 4 },
        textShadowRadius: 4,
    },
    link: {
        fontFamily: 'MontserratAlternates_700Bold',
        textDecorationLine: 'underline',
        textDecorationStyle: 'solid',
        color: '#FFFFFF',
    },
    modalOverlay: {
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        justifyContent: 'flex-end',
    },
    fadeOverlay: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalContent: {
        width: '100%',
        maxHeight: '90%',
        backgroundColor: '#FFFFFF',
        borderTopLeftRadius: 16,
        borderTopRightRadius: 16,
        paddingHorizontal: 20,
        paddingTop: 12,
        alignItems: 'center',
    },
    modalTitleContainer: {
        alignItems: 'center',
        marginBottom: 20,
    },
    modalTitle: {
        fontFamily: 'MontserratAlternates_700Bold',
        fontSize: 20,
        textAlign: 'center',
        maxWidth: 242,
        lineHeight: 24,
    },
    scrollViewContent: {
        alignItems: 'center',
        paddingBottom: 12,
    },
    authButton: {
        height: 50,
        width: '80%',
        maxWidth: 320,
        minWidth: 300,
        borderRadius: 16,
        backgroundColor: '#FFFFFF',
        justifyContent: 'center',
        alignItems: 'center',
        marginVertical: 12,
        borderWidth: 1,
        borderColor: '#666666',
        alignSelf: 'center',
    },
    authButtonText: {
        fontFamily: 'Roboto_500Medium',
        fontSize: 16,
        textAlign: 'center',
        color: '#1F1F1F',
    },
    closeButton: {
        position: 'absolute',
        top: 15,
        right: 15,
        width: 30,
        height: 30,
        justifyContent: 'center',
        alignItems: 'center',
    },
    closeButtonText: {
        fontSize: 18,
        color: '#333',
    },
});

export default Registration;
